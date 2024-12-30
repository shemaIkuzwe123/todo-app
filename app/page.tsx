import InstallPrompt from "@/components/install-prompt";
import Todo from "@/components/Todo";
import { Button } from "@/components/ui/button";
import { Metadata } from "next";
import Link from "next/link";
import {PushNotificationManager} from "@/components/send";
import { LogIn } from "lucide-react";
import {Card, CardContent} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import {Separator} from "@/components/ui/separator";

export const metadata: Metadata = {
  title: "Todo App",
  description: "What are you doing today",
};

export default function TodoApp() {
  // useEffect(()=>{
  //   useTodoStore.persist.rehydrate()
  // })
  return (
          <div className="w-full mx-auto  flex flex-col min-h-screen">
              {/* Header */}
              <div className="flex justify-between items-center mb-6 p-4">
                  <h1 className="text-3xl font-bold text-blue-400">Todo List</h1>
                  <Button variant="ghost" className="flex items-center gap-2">
                      <LogIn className="h-4 w-4"/>
                      Login
                  </Button>
              </div>
              <div className="flex-1 w-96 min-h-48 bg-white p-4 rounded-md mx-auto">
                <Todo/>

              </div>
              <div className="mt-6 bg-secondary p-4">
                  <Separator className="my-4"/>
                  <div className="flex justify-between">

                      <div className="space-y-2">
                          <div className="flex items-center gap-4">
                             <InstallPrompt/>
                          </div>
                      </div>

                      <div className="space-y-2">
                          <div className="flex items-center justify-between">
                              <div className="flex items-center gap-2">
                                    <PushNotificationManager/>
                              </div>
                      </div>
                  </div>
              </div>
          </div>
      </div>
  )
