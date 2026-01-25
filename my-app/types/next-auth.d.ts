import NextAuth from "next-auth"
import { DefaultSession } from "next-auth"
import { JWT as DefaultJwt } from "next-auth/jwt";
declare module "next-auth" {
  interface Session {
    user: {
      id: string
      name?: string | null
      email?: string | null
      image?: string | null
    } & DefaultSession["user"];
  }

  interface User {
    id: string
  }
}

declare module "next-auth/jwt" {
  interface JWT extends DefaultJWT {
    id?: string;
    isValid?: boolean;
  }
}