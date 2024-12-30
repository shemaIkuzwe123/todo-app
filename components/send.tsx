"use client";
import { useState, useEffect } from "react";
import {
  subscribeUser,
  unsubscribeUser,
  sendNotification,
} from "@/lib/notification";
import {BellRing} from "lucide-react";
import {Label} from "@/components/ui/label";
import {Switch} from "@/components/ui/switch";
import {Input} from "@/components/ui/input";
import {Button} from "@/components/ui/button";

function urlBase64ToUint8Array(base64String: string) {
  const padding = "=".repeat((4 - (base64String.length % 4)) % 4);
  const base64 = (base64String + padding).replace(/-/g, "+").replace(/_/g, "/");

  const rawData = window.atob(base64);
  const outputArray = new Uint8Array(rawData.length);

  for (let i = 0; i < rawData.length; ++i) {
    outputArray[i] = rawData.charCodeAt(i);
  }
  return outputArray;
}

export function PushNotificationManager() {
  const [isSupported, setIsSupported] = useState(false);
  const [subscription, setSubscription] = useState<PushSubscription | null>(
    null
  );
  const [message, setMessage] = useState("");

  useEffect(() => {
    if ("serviceWorker" in navigator && "PushManager" in window) {
      setIsSupported(true);
      registerServiceWorker();
    }
  }, []);

  async function registerServiceWorker() {
    const registration = await navigator.serviceWorker.register("/sw.js", {
      scope: "/",
      updateViaCache: "none",
    });
    const sub = await registration.pushManager.getSubscription();
    setSubscription(sub);
  }

  async function subscribeToPush() {
    const registration = await navigator.serviceWorker.ready;
    const sub = await registration.pushManager.subscribe({
      userVisibleOnly: true,
      applicationServerKey: urlBase64ToUint8Array(
        process.env.NEXT_PUBLIC_VAPID_PUBLIC_KEY!
      ),
    });
    setSubscription(sub);
    const serializedSub = JSON.parse(JSON.stringify(sub));
    await subscribeUser(serializedSub);
  }

  async function unsubscribeFromPush() {
    await subscription?.unsubscribe();
    setSubscription(null);
    await unsubscribeUser();
  }

  async function sendTestNotification() {
    if (subscription) {
      await sendNotification(message);
      setMessage("");
    }
  }

  if (!isSupported) {
    return <p>Push notifications are not supported in this browser.</p>;
  }
  const handleSubscriptionToggle = () => {
     unsubscribeFromPush()
  }
  return (
      <div className={"bg-white p-2 rounded-md"}>
        <div className="space-y-2">
          <div className="flex items-center justify-between space-x-2">
            <div className="flex items-center space-x-2">
              <BellRing className="h-4 w-4"/>
              <Label htmlFor="push-notifications">Push Notifications</Label>
            </div>
            <Switch
                id="push-notifications"
                checked={!!subscription}
                onCheckedChange={handleSubscriptionToggle}
            />
          </div>

          <p className="text-sm text-muted-foreground">
            {subscription
                ? "You are subscribed to push notifications."
                : "Push notifications are disabled."}
          </p>
        </div>

        <div className="space-y-2">
          <Label htmlFor="notification-message">Notification Message</Label>
          <div className="flex space-x-2">
            <Input
                id="notification-message"
                placeholder="Enter notification message"
                value={message}
                onChange={(e) => setMessage(e.target.value)}
            />
            <Button onClick={sendTestNotification}>
              Send Test
            </Button>
          </div>
        </div>
      </div>
  );
}

