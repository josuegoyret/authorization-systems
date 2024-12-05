import NextAuth from "next-auth";
import GitHub from "next-auth/providers/github";
import Google from "next-auth/providers/google";
import Twitter from "next-auth/providers/twitter";
import { PrismaAdapter } from "@auth/prisma-adapter";
import { prisma } from "~/lib/prisma";
import { postVerificationRequestToSendgrid } from "./lib/email";
import SendGrid from "next-auth/providers/sendgrid";

export const { handlers, signIn, signOut, auth } = NextAuth({
  providers: [
    Google,
    GitHub,
    Twitter,
    SendGrid({
      server: process.env.EMAIL_SERVER,
      from: process.env.EMAIL_FROM,
      async sendVerificationRequest({
        identifier: emailTo,
        url: magicLink,
        provider: { apiKey, from: emailFrom },
      }) {
        if (!apiKey) throw new Error("Missing email server");
        if (!emailFrom) throw new Error("Missing email from");

        await postVerificationRequestToSendgrid({
          apiKey,
          emailFrom,
          emailTo,
          magicLink,
        });
      },
    }),
  ],
  adapter: PrismaAdapter(prisma),
  pages: {
    signIn: "/access",
  },
  session: {
    strategy: "database",
    maxAge: 60 * 60 * 24 * 7,
  },
});
