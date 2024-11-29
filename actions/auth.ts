"use server";

import { signIn } from "~/auth";

export const signWithGoogle = async () => {
  await signIn("google", {
    redirectTo: "/",
  });
};

export const signWithGitHub = async () => {
  await signIn("github", {
    redirectTo: "/",
  });
};

export const signWithTwitter = async () => {
  await signIn("twitter", {
    redirectTo: "/",
  });
};
