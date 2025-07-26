import NextAuth from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";

const handler = NextAuth({
  providers: [
    CredentialsProvider({
      name: "Admin Login",
      credentials: {
        username: { label: "Username", type: "text" },
        password: { label: "Password", type: "password" },
      },
      async authorize(credentials) {
        // Validate admin credentials from environment variables
        const ADMIN_USER = process.env.ADMIN_USER;
        const ADMIN_PASS = process.env.ADMIN_PASS;

        if (
          credentials?.username === ADMIN_USER &&
          credentials?.password === ADMIN_PASS
        ) {
          return { id: "1", name: "Admin", role: "admin" };
        }
        return null;
      },
    }),
  ],
  session: {
    strategy: "jwt",
  },
  callbacks: {
    async jwt({ token, user }) {
      if (user) {
        token.role = user.role || "user";
      }
      return token;
    },
    async session({ session, token }) {
      if (session.user) {
        session.user.role = token.role;
      }
      return session;
    },
  },
  pages: {
    signIn: "/login", // Redirect to custom login page if needed
  },
  secret: process.env.NEXTAUTH_SECRET,
});

export { handler as GET, handler as POST };
