"use client";

import { Button } from "./ui/button";
import {
  signWithGitHub,
  signWithGoogle,
  signWithTwitter,
} from "~/actions/auth";
import { GitHub, Google, Twitter } from "./ui/icons/brand";

const AccessCardProviderButtons = () => {
  return (
    <div className="flex items-center gap-2">
      <Button variant="outline" className="flex-1" onClick={signWithGoogle}>
        <Google />
        Google
      </Button>
      <Button variant="outline" className="flex-1" onClick={signWithGitHub}>
        <GitHub />
        GitHub
      </Button>
      <Button variant="outline" className="flex-1" onClick={signWithTwitter}>
        <Twitter /> Twitter
      </Button>
    </div>
  );
};

export default AccessCardProviderButtons;
