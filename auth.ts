import NextAuth from "next-auth";
import GitHub from "next-auth/providers/github";
import Google from "next-auth/providers/google";
import Twitter from "next-auth/providers/twitter";
import SendGrid from "next-auth/providers/sendgrid";
import { PrismaAdapter } from "@auth/prisma-adapter";
import { prisma } from "~/lib/prisma";
import { postVerificationRequestToSendgrid } from "./lib/email";

export const { handlers, signIn, signOut, auth } = NextAuth({
  providers: [
    Google,
    GitHub,
    Twitter,
    SendGrid({
      // nodemailer has dependencies wich are not edge compatible; resend is edge compatible, but won't allow free domain senders
      server: process.env.EMAIL_SERVER,
      from: process.env.EMAIL_FROM,
      async sendVerificationRequest({
        identifier: emailTo,
        url: magicLink,
        provider: { apiKey, from: emailFrom },
      }) {
        // TODO: catch error, if any, and redirect to erro page
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
  adapter: PrismaAdapter(prisma), // TODO: configure to run in edge environment
  pages: {
    signIn: "/access",
  },
  session: {
    strategy: "database",
    maxAge: 60 * 60 * 24 * 7,
  },
  callbacks: {
    authorized({ auth, request: { nextUrl } }) {
      const isLoggedIn = !!auth?.user;
      const isOnHome = nextUrl.pathname === "/";
      if (isOnHome) {
        if (isLoggedIn) return true;
        return false; // Redirect unauthenticated users to login page
      } else if (isLoggedIn) {
        return Response.redirect(new URL("/", nextUrl));
      }
      return true;
    },
  },
});
