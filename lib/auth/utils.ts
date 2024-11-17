import { db } from "@/lib/db/index";
import { PrismaAdapter } from "@auth/prisma-adapter"
import { DefaultSession, getServerSession, NextAuthOptions } from "next-auth";
import { Adapter } from "next-auth/adapters";
import { redirect } from "next/navigation";
import { env } from "@/lib/env.mjs"
import GoogleProvider from "next-auth/providers/google";
import { GoogleProfile } from "next-auth/providers/google";
import CredentialsProvider from "next-auth/providers/credentials";
import bcrypt from "bcryptjs";

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
    email: string; // Always required
    name?: string; // Optional, aligning with the database
  }
}

declare module "next-auth/jwt" {
  interface JWT {
    id: string;
    role: Role;
  }
}

export type Role = "USER" | "ADMIN";

export interface User {
  id: string;
  email: string;
  name?: string; // Optional, as Prisma allows this to be undefined or null
  role: Role;
  image?: string | null; // Allows null or undefined
}

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
    CredentialsProvider({
      id: "user-credentials",
      name: "User Credentials",
      credentials: {
        email: { label: "Email", type: "email" },
        password: { label: "Password", type: "password" },
      },
      async authorize(credentials): Promise<User | null> {
        if (!credentials?.email || !credentials?.password) {
          return null;
        }

        try {
          const user = await db.user.findFirst({
            where: {
              email: credentials.email,
              role: "USER",
            },
          });

          if (user && user.email && user.name) {
            if (!user.password) {
              // User exists but has no password (Google OAuth user)
              return null;
            }

            const passwordValid = await bcrypt.compare(
              credentials.password,
              user.password
            );

            if (!passwordValid) {
              return null;
            }

            return {
              id: user.id,
              email: user.email,
              name: user.name,
              role: "USER",
              image: user.image || null,
            } satisfies User;
          }

          const hashedPassword = await bcrypt.hash(credentials.password, 10);
          const defaultName = credentials.email.split('@')[0];

          const newUser = await db.user.create({
            data: {
              email: credentials.email,
              password: hashedPassword,
              name: defaultName,
              role: "USER",
            },
          });

          if (newUser.email && newUser.name) {
            return {
              id: newUser.id,
              email: newUser.email,
              name: newUser.name,
              role: "USER",
              image: null,
            } satisfies User;
          }

          return null;
        } catch (error) {
          console.error("User authentication error:", error);
          return null;
        }
      },
    }),
    CredentialsProvider({
      id: "admin-credentials",
      name: "Admin Login",
      credentials: {
        email: { label: "Email", type: "email" },
        password: { label: "Password", type: "password" },
        secretkey: { label: "Secret Key", type: "password" },
      },
      async authorize(credentials): Promise<User | null> {
        if (
          !credentials?.email ||
          !credentials?.password ||
          !credentials?.secretkey
        ) {
          throw new Error("All fields are required.");
        }

        if (credentials.secretkey !== process.env.ADMIN_SECRET_KEY) {
          throw new Error("Invalid secret key.");
        }

        const admin = await db.user.findFirst({
          where: {
            email: credentials.email,
            role: "ADMIN",
          },
        });

        if (!admin) {
          // Create new admin
          const hashedPassword = await bcrypt.hash(credentials.password, 10);
          const defaultName = credentials.email.split("@")[0];

          const newAdmin = await db.user.create({
            data: {
              email: credentials.email,
              password: hashedPassword,
              name: defaultName,
              role: "ADMIN",
            },
          });

          return {
            id: newAdmin.id,
            email: newAdmin.email!,
            name: newAdmin.name || undefined,
            role: newAdmin.role,
            image: newAdmin.image || "",
          };
        }

        if (!admin.password) {
          throw new Error("Admin password is missing in the database.");
        }

        const isPasswordValid = await bcrypt.compare(
          credentials.password,
          admin.password
        );

        if (!isPasswordValid) {
          throw new Error("Invalid password.");
        }

        return {
          id: admin.id,
          email: admin.email!,
          name: admin.name || undefined,
          role: admin.role,
          image: admin.image || "",
        };
      }
    }),
  ],
  callbacks: {
    async jwt({ token, user }) {
      if (user) {
        token.id = user.id;
        token.name = user.name || "";
        token.role = user.role;
        token.email = user.email;
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
  if (!session) redirect("/api/auth/signin");
};

export const checkAdminAuth = async () => {
  const { session } = await getUserAuth();
  if (!session || session.user.role !== "ADMIN") {
    redirect("/admin");
  }
  return session;
};
