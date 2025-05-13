"use client";

import { CheckIcon } from "lucide-react";
import { useState } from "react";
import { api } from "~/trpc/react";
import { Button } from "./ui/button";
import { Input } from "./ui/input";

export default function WaitlistForm() {
  const [email, setEmail] = useState("");
  const [status, setStatus] = useState<
    "idle" | "loading" | "success" | "error" | "duplicate"
  >("idle");

  const joinWaitlist = api.waitlist.join.useMutation({
    onSuccess: (res) => {
      const { alreadyJoined, success } = res;
      if (alreadyJoined) {
        setStatus("duplicate");
      } else if (success) {
        setEmail("");
        setStatus("success");
      } else {
        setStatus("error");
      }
    },
    onError: () => setStatus("error"),
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!email) return;
    setStatus("loading");
    joinWaitlist.mutate({ email });
  };

  return (
    <form onSubmit={handleSubmit} className="flex flex-col">
      <div className="flex flex-col">
        <h2 className="text-md leading font-bold">Join the waitlist</h2>
        <p className="text-muted-foreground mt-0.5 text-sm sm:max-w-[320px]">
          Join our waitlist and be first to be notified when the juice is ready.
        </p>
      </div>
      <div className="mt-2 flex flex-col">
        <label htmlFor="email" className="mb-[2px] text-sm font-medium">
          Email address
        </label>
        <Input
          id="email"
          type="email"
          placeholder="angryou@example.com"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
          className="mb-[4px] sm:max-w-[240px]"
        />
      </div>
      {status === "success" ? (
        <p className="text-xs font-medium text-green-500">
          You&apos;re in! We&apos;ll keep you updated.
        </p>
      ) : status === "duplicate" ? (
        <p className="text-xs font-medium text-orange-500">
          You&apos;re already on the list.
        </p>
      ) : status === "error" ? (
        <p className="text-xs font-medium text-red-500">
          Invalid email or the server is trippin.
        </p>
      ) : (
        <p className="text-muted-foreground text-xs font-medium">
          Your email is safely stored in our db
        </p>
      )}
      <div className="mt-2">
        <Button
          variant="default"
          type="submit"
          isLoading={status === "loading"}
          endIcon={<CheckIcon />}
        >
          {status === "loading" ? "Joining" : "Join Waitlist"}
        </Button>
      </div>
    </form>
  );
}
