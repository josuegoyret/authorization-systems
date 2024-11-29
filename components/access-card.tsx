import AccessCardContent from "./access-card-content";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "./ui/card";

const AccessCard = () => {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Welcome</CardTitle>
        <CardDescription>
          Choose your preferred method to continue
        </CardDescription>
      </CardHeader>
      <CardContent>
        <AccessCardContent />
      </CardContent>
      <CardFooter>
        <p className="text-sm text-muted-foreground">
          By signing in, you agree to our Terms of Service and Privacy Policy.
        </p>
      </CardFooter>
    </Card>
  );
};

export default AccessCard;
