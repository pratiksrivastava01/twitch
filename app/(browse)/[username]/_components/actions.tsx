"use client";

import { toast } from "sonner";
import { useTransition } from "react";

import { onFollow, onUnfollow } from "@/actions/follow";
import { Button } from "@/components/ui/button";
import { onBlock, onUnblock } from "@/actions/block";

export interface ActionsProps {
  isFollowing: boolean;
  userId: string;
  userName: string;
}

export const Actions = ({ isFollowing, userId, userName }: ActionsProps) => {
  const [isPending, startTransition] = useTransition();

  const handleFollow = () => {
    startTransition(() => {
      onFollow(userId)
        .then(() => toast.success(`You are now following ${userName}🚀`))
        .catch(() => toast.error("Something went wrong, failed to follow 😥"));
    });
  };

  const handleUnfollow = () => {
    startTransition(() => {
      onUnfollow(userId)
        .then(() => toast.success(`You have unfollowed ${userName}💔`))
        .catch(() => toast.error("Something went wrong, failed to follow 😥"));
    });
  };

  const handleBlock = () => {
    startTransition(() => {
      onBlock(userId)
        .then(() => toast.success(`You have blocked ${userName}🚫`))
        .catch(() => toast.error("Something went wrong, failed to block 😥"));
    });
  };

  const handleUnBlock = () => {
    startTransition(() => {
      onUnblock(userId)
        .then(() => toast.success(`You have unblocked ${userName}🚫`))
        .catch(() => toast.error("Something went wrong, failed to block 😥"));
    });
  };

  const onClick = () => {
    if (isFollowing) {
      handleUnfollow();
    } else {
      handleFollow();
    }
  };

  return (
    <>
      <Button
        variant={isFollowing ? "destructive" : "primary"}
        disabled={isPending}
        onClick={onClick}
      >
        {isFollowing ? "Unfollow" : "Follow"}
      </Button>
      <Button onClick={handleBlock} disabled={isPending}>
        Block
      </Button>
      <Button onClick={handleUnBlock} disabled={isPending}>
        Unblock
      </Button>
    </>
  );
};
