import InstallPrompt from "@/components/install-prompt";
import Todo from "@/components/Todo";
import { Button } from "@/components/ui/button";
import { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Todo App",
  description: "What are you doing today",
};

export default function TodoApp() {
  // useEffect(()=>{
  //   useTodoStore.persist.rehydrate()
  // })
  return (
    <div className="bg-white rounded-lg shadow-xl p-6 w-full max-w-md">
      <div className="flex justify-between">
        <h1 className="text-3xl font-bold text-center mb-6 text-indigo-600">
          My Todo List
        </h1>
        <Button asChild variant={"link"}>
          <Link href={"/auth/login"}>Login</Link>
        </Button>
      </div>
      <Todo />
      <InstallPrompt/>
    </div>
  );
}
