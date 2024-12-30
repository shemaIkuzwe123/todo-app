"use client";
import { useEffect, useState } from "react";
import { PushNotificationManager } from "./send";
import  {Card,CardTitle,CardHeader,CardContent} from  "@/components/ui/card"
import { Button } from "./ui/button";
import { Download, HomeIcon} from "lucide-react";
export default function InstallPrompt() {
  const [isIOS, setIsIOS] = useState(false);
  const [isStandalone, setIsStandalone] = useState(false);

  useEffect(() => {
    setIsIOS(
      /iPad|iPhone|iPod/.test(navigator.userAgent) && !(window as any).MSStream
    );
    setIsStandalone(window.matchMedia("(display-mode: standalone)").matches);
  },[]);

  return (

          <div className="space-y-6 flex gap-2">
              <div className="space-y-4">
                  <Button
                      variant="outline"
                      className="w-full justify-start"
                      //onClick={handleInstall}
                  >
                      <Download className="mr-2 h-4 w-4" />
                      Install App
                  </Button>

                  <Button
                      variant="outline"
                      className="w-full justify-start"
                      //onClick={handleAddToHome}
                  >
                      <HomeIcon className="mr-2 h-4 w-4" />
                      Add to Home Screen
                  </Button>
              </div>

          </div>
  );
}
