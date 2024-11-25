"use client";

import { Button } from "./ui/button";
import { FaGoogle, FaGithub } from "react-icons/fa";
import { FaXTwitter } from "react-icons/fa6";
import {
  signWithGitHub,
  signWithGoogle,
  signWithTwitter,
} from "~/actions/auth";

const SignInProviderButtons = () => {
  return (
    <div className="flex items-center gap-2">
      <Button variant="outline" className="flex-1" onClick={signWithGoogle}>
        <FaGoogle />
        Google
      </Button>
      <Button variant="outline" className="flex-1" onClick={signWithGitHub}>
        <FaGithub />
        GitHub
      </Button>
      <Button variant="outline" className="flex-1" onClick={signWithTwitter}>
        <FaXTwitter /> Twitter
      </Button>
    </div>
  );
};

export default SignInProviderButtons;
