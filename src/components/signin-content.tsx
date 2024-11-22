import SignInEmailForm from "./signin-email-form";
import SignInProviderButtons from "./signin-provider-buttons";

const SignInContent = () => {
  return (
    <div className="space-y-4">
      <SignInEmailForm />
      <div className="w-full relative flex justify-center">
        <span className="w-full absolute inset-y-1/2 border-t -z-1"></span>
        <p className="text-xs text-muted-foreground uppercase px-2 bg-background z-0">
          or continue with
        </p>
      </div>
      <SignInProviderButtons />
    </div>
  );
};

export default SignInContent;
