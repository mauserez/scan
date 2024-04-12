import NextAuth from "next-auth/next";
import { nextAuthOptions } from "../../../../../session.config";

const handler = NextAuth(nextAuthOptions);
export { handler as GET, handler as POST };
