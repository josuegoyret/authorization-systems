import { LogOut } from "lucide-react";
import { Button } from "./ui/button";
import { handleSignOut } from "~/actions/auth";

const LogOutButton = () => {
  return (
    <Button onClick={handleSignOut}>
      <LogOut /> Log Out
    </Button>
  );
};

export default LogOutButton;
