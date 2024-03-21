import NextAuth from "next-auth";
import GoogleProvider from "next-auth/providers/google";
import { randomBytes } from "crypto";
import axios from 'axios'



interface BackendData {
  name?: string | null;
  email?: string | null;
  image?: string | null;
}

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

      // Function to send data to the backend
      // Function to send data to the backend
      async function sendDataToBackend(data: BackendData) {
        try {
          const response = await axios.post('http://localhost:5000/api/auth/callback/google/', data);
          console.log('Response status:', response.status); // Log the response status
          if (response.status === 200 || response.status === 201) { // Adjust the condition to include 201 Created status
            console.log('Data sent successfully to backend');
          } else {
            throw new Error('Failed to send data to backend');
          }
        } catch (error) {
          console.error('Error sending data to backend:', error);
          throw error;
        }
      }

      // Call the function to send data to backend
      try {
        await sendDataToBackend({ name, email, image });
      } catch (error) {
        console.error('Error sending data to backend:', error);
        // Handle error, show error message to the user, etc.
      }


      return Promise.resolve('/profile');
    }
  }
});

export { handler as GET, handler as POST };


