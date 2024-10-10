"use server";

import { followUser, unfollowUser } from "@/lib/follow-service";

import { revalidatePath } from "next/cache";

export const onFollow = async (id: string) => {
  try {
    const followedUser = await followUser(id);

    revalidatePath(`/`);

    if (followedUser) {
      revalidatePath(`/${followedUser.follower.username}`);
    }
  } catch (error) {
    throw new Error("🚧Internal server error🚧");
  }
};

export const onUnFollow = async (id: string) => {
  try {
    const unfollowedUser = await unfollowUser(id);

    revalidatePath(`/`);

    if (unfollowedUser) {
      revalidatePath(`/${unfollowedUser.following.username}`);
    }
  } catch (error) {
    throw new Error("🚧Internal server error🚧");
  }
};
