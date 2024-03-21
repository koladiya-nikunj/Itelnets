import NextAuth from "next-auth";
import GoogleProvider from "next-auth/providers/google";
import { randomBytes } from "crypto";

const generateSecret = () => {
  return randomBytes(32).toString("hex");
}

const handler = NextAuth({
  providers: [
    GoogleProvider({
      clientId: process.env.CLIENT_ID as string,
      clientSecret: process.env.CLIENT_SECRET as string,
    })
  ],
  secret: generateSecret(),
  callbacks: {
    async signIn({ user }) {
      const { name, email, image } = user;
      console.log("Successful login:", { name, email, image });

      return Promise.resolve('/profile');
    }
  }
});

export { handler as GET, handler as POST };


