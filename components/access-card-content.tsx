import AccessCardEmailForm from "./access-card-email-form";
import AccessCardProviderButtons from "./access-card-provider-buttons";

const AccessCardContent = () => {
  return (
    <div className="space-y-4">
      <AccessCardEmailForm />
      <div className="w-full relative flex justify-center">
        <span className="w-full absolute inset-y-1/2 border-t -z-1"></span>
        <p className="text-xs text-muted-foreground uppercase px-2 bg-background z-0">
          or connect with
        </p>
      </div>
      <AccessCardProviderButtons />
    </div>
  );
};

export default AccessCardContent;
