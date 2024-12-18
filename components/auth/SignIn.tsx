"use client";
import { useSession, signIn, signOut } from "next-auth/react";
import { Button } from "@/components/ui/button";
import SubmittedPapers from "../SubmittedPapers";

export default function SignIn() {
  const { data: session, status } = useSession();

  if (status === "loading") return <div>Loading...</div>;

  if (session) {
    return (
      <div className="space-y-3">
        <div className="bg-purple-600 text-white max-w-lg items-center rounded-md ">
          <div className="p-6">
            Signed in as{" "}
            <span className="font-medium">{session.user?.email}</span>
            <br/>
            Role:{" "}
            <span className="font-medium">{session.user?.role}</span>
          </div>
        </div>
        <Button variant={"destructive"} onClick={() => signOut({ callbackUrl: "/" })}>
          Sign out
        </Button>
        <SubmittedPapers />
      </div>
    );
  }
  return (
    <div className="space-y-3">
      <p>Not signed in </p>
      <Button onClick={() => signIn()}>Sign in</Button>
    </div>
  );
}
