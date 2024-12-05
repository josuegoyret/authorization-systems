"use client";

import { useForm } from "react-hook-form";
import { Form, FormControl, FormField, FormItem, FormMessage } from "./ui/form";
import { Input } from "./ui/input";
import { Button } from "./ui/button";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { toast } from "sonner";
import { useState } from "react";
import { Loader2 } from "lucide-react";
import { signWithEmail } from "~/actions/auth";

const formSchema = z.object({
  email: z
    .string()
    .trim()
    .min(1, { message: "Complete with your email" })
    .email("Enter a valid email"),
});

const AccessCardEmailForm = () => {
  const [sending, setSending] = useState<boolean>(false);

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      email: "",
    },
  });

  const onSubmit = async ({ email }: z.infer<typeof formSchema>) => {
    setSending(true);
    try {
      await signWithEmail({ email });
      toast(`We sent an email to ${email} with a magic link to access.`);
    } catch (error) {
      console.error(error);
      toast(`Something went wrong. Please, try again`);
    }
    setSending(false);
  };

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
        <FormField
          control={form.control}
          name="email"
          render={({ field }) => (
            <FormItem>
              <FormControl>
                <Input
                  type="email"
                  placeholder="Enter your email"
                  autoCapitalize="none"
                  autoComplete="email"
                  autoCorrect="off"
                  {...field}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <Button type="submit" className="w-full">
          {sending && <Loader2 className="h-4 w-4 animate-spin" />}
          Join with Magic Link
        </Button>
      </form>
    </Form>
  );
};

export default AccessCardEmailForm;
