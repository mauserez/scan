import { SessionUserType, getToken } from "./src/shared/token/actions";
import CredentialsProvider from "next-auth/providers/credentials";
import { NextAuthOptions } from "next-auth";
import { User } from "next-auth";
import dayjs from "dayjs";
import { signOut } from "next-auth/react";
import { redirect } from "next/navigation";

declare module "next-auth" {
	interface User extends SessionUserType {}
	interface AdapterUser extends SessionUserType {}
	interface Session {
		user: User;
	}
}

declare module "next-auth/jwt" {
	interface JWT {
		user: User;
	}
}

export const authConfig: NextAuthOptions = {
	secret: process.env.NEXTAUTH_SECRET,
	session: {
		strategy: "jwt",
	},
	pages: {
		signIn: "/login",
	},
	providers: [
		CredentialsProvider({
			name: "Credentials",
			credentials: {
				login: {
					label: "login",
					type: "text",
					placeholder: "input login",
				},

				password: {
					label: "password",
					type: "password",
					placeholder: "input password",
				},
			},

			async authorize(credentials) {
				if (!credentials?.password || !credentials.login) {
					throw new Error("Please provide all credentials");
				}
				const userResponse = await getToken(credentials);

				if (userResponse.errorText) {
					throw new Error(userResponse.errorText);
				}

				console.log(userResponse.data);

				return userResponse.data;
			},
		}),
	],
	callbacks: {
		async jwt({ token, user }) {
			if (user) {
				token.user = user;
			} else {
				const now = dayjs(Date());
				const tokenExpire = dayjs(token.user.expire);

				if (tokenExpire < now) {
					redirect("/api/auth/logout");
				}

				/* if (token.user) {
					const now = Math.floor(Date.now() / 1000);
					if (token.user.exp - 300 < now) {
						const res = await refreshAccess(token.user.refresh_token);
						if (res.data) {
							token.user = res.data;
						}
					}
				} */
			}

			return token;
		},
		async session({ token, session }) {
			session.user = token.user;
			return session;
		},
	},
};
