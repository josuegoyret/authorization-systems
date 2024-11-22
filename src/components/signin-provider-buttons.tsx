"use client";

import { Button } from "./ui/button";
import { FaGoogle, FaGithub } from "react-icons/fa";
import { FaXTwitter } from "react-icons/fa6";

const SignInProviderButtons = () => {
  return (
    <div className="flex items-center gap-2">
      <Button variant="outline" className="flex-1">
        <FaGoogle />
        Google
      </Button>
      <Button variant="outline" className="flex-1">
        <FaGithub />
        Github
      </Button>
      <Button variant="outline" className="flex-1">
        <FaXTwitter /> Twitter
      </Button>
    </div>
  );
};

export default SignInProviderButtons;
