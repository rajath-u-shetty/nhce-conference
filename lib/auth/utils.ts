import { db } from "@/lib/db/index";
import { PrismaAdapter } from "@auth/prisma-adapter"
import { DefaultSession, getServerSession, NextAuthOptions } from "next-auth";
import { Adapter } from "next-auth/adapters";
import { redirect } from "next/navigation";
import { env } from "@/lib/env.mjs"
import GoogleProvider from "next-auth/providers/google";
import { GoogleProfile } from "next-auth/providers/google";

export type AuthSession = {
  session: {
    user: {
      id: string;
      name: string;
      email: string;
      role: "USER" | "ADMIN";
    };
  } | null;
};

declare module "next-auth" {
  interface Session {
    user: {
      id: string;
      role: Role;
    } & DefaultSession["user"];
  }
  interface User {
    id: string;
    role: Role;
    email: string;
    name?: string;
  }
}

declare module "next-auth/jwt" {
  interface JWT {
    id: string;
    role: Role;
  }
}

export type Role = "USER" | "ADMIN";

export const authOptions: NextAuthOptions = {
  adapter: PrismaAdapter(db) as Adapter,
  session: {
    strategy: "jwt"
  },
  providers: [
    GoogleProvider({
      clientId: env.GOOGLE_CLIENT_ID,
      clientSecret: env.GOOGLE_CLIENT_SECRET,
      profile(profile: GoogleProfile) {
        return {
          id: profile.sub,
          name: profile.name,
          email: profile.email,
          image: profile.picture,
          role: "USER",
        };
      }
    }),
  ],
  callbacks: {
    async jwt({ token, user, trigger, session }) {
      // Initial sign in
      if (user) {
        token.id = user.id;
        token.name = user.name || "";
        token.role = user.role;
        token.email = user.email;
      }

      // Handle role updates
      if (trigger === "update" && session?.user?.role) {
        token.role = session.user.role;
      }

      // Always fetch fresh user data
      const freshUser = await db.user.findUnique({
        where: { id: token.id as string },
        select: {
          id: true,
          name: true,
          email: true,
          role: true,
        },
      });

      if (freshUser) {
        token.role = freshUser.role;
        token.name = freshUser.name || token.name;
        token.email = freshUser.email;
      }

      return token;
    },

    async session({ session, token }) {
      session.user = {
        ...session.user,
        id: token.id as string,
        name: token.name as string,
        role: token.role as Role,
        email: token.email as string,
      };
      return session;
    },
  },
};

export const getUserAuth = async () => {
  const session = await getServerSession(authOptions);
  return { session } as AuthSession;
};

export const checkAuth = async () => {
  const { session } = await getUserAuth();
  if (!session) redirect("/sign-in");
};

export const checkAdminAuth = async () => {
  const { session } = await getUserAuth();
  if (!session || session.user.role !== "ADMIN") {
    redirect("/account");
  }
  return session;
};
