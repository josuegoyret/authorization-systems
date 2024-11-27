import NextAuth from "next-auth";
import GitHub from "next-auth/providers/github";
import Google from "next-auth/providers/google";
import Twitter from "next-auth/providers/twitter";
import Nodemailer from "next-auth/providers/nodemailer";
import { PrismaAdapter } from "@auth/prisma-adapter";
import { prisma } from "~/lib/prisma";
import { createTransportAndSendEmail } from "~/lib/email";

export const { handlers, signIn, signOut, auth } = NextAuth({
  providers: [
    Google,
    GitHub,
    Twitter,
    Nodemailer({
      server: process.env.EMAIL_SERVER,
      from: process.env.EMAIL_FROM,
      async sendVerificationRequest({
        identifier: emailTo,
        url: magicLink,
        provider: { server: smtpEmailServer, from: emailFrom },
      }) {
        await createTransportAndSendEmail({
          smtpEmailServer,
          emailFrom,
          emailTo,
          magicLink,
        });
      },
    }),
  ],
  adapter: PrismaAdapter(prisma),
  pages: {
    signIn: "/signin",
  },
  session: {
    strategy: "database",
    maxAge: 60 * 60 * 24 * 7,
  },
});
