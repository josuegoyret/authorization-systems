"use server";

import { signIn, signOut } from "~/auth";

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

export const signWithEmail = async ({ email }: { email: string }) => {
  await signIn("sendgrid", {
    email,
    redirectTo: "/",
    redirect: false,
  });
};

export const handleSignOut = async () => {
  await signOut({
    redirectTo: "/access",
  });
};
