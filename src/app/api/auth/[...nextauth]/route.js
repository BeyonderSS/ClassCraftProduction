import NextAuth from "next-auth";
import GoogleProvider from "next-auth/providers/google";
import axios from "axios";
import User from "@/app/middleware/User";
import mongoose from 'mongoose';


async function refreshAccessToken(refreshToken) {
  const tokenUrl = "https://oauth2.googleapis.com/token";

  const params = {
    client_id: process.env.GOOGLE_CLIENT_ID,
    client_secret: process.env.GOOGLE_CLIENT_SECRET,
    grant_type: "refresh_token",
    refresh_token: refreshToken,
  };

  try {
    const response = await axios.post(tokenUrl, new URLSearchParams(params));
    return response.data;
  } catch (error) {
    console.error("Error refreshing access token:", error);
    return null;
  }
}

export const authOptions = {
  providers: [
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET,
      authorization: {
        url: "https://accounts.google.com/o/oauth2/v2/auth?prompt=consent&access_type=offline&response_type=code",
        params: {
          access_type: "offline",
          prompt: "consent",
          scope:
            "openid profile email https://www.googleapis.com/auth/classroom.courses.readonly https://www.googleapis.com/auth/classroom.courses https://www.googleapis.com/auth/classroom.rosters https://www.googleapis.com/auth/classroom.announcements.readonly https://www.googleapis.com/auth/calendar https://www.googleapis.com/auth/classroom.announcements https://www.googleapis.com/auth/youtube.upload https://www.googleapis.com/auth/youtube.force-ssl",
        },
      },
    }),
  ],
  pages: {
    signIn: "/auth/signin",
  },
  httpTimeout: 10000,
  jwt: {
    secret: process.env.JWT_SECRET,
  },
  callbacks: {
    jwt: async ({ token, account, user }) => {
      if (account) {
        token.accessToken = account.access_token;
        token.refreshToken = account.refresh_token;
        token.expiresAt = Date.now() + 60 * 60 * 1000; // Set expiry time to 1 hour from login time

        await mongoose.connect(process.env.MONGODB_URI, {
          useNewUrlParser: true,
          useUnifiedTopology: true,
          dbName: "ClassCraftTest",
        });

        let dbUser = await User.findOne({ email: user.email });
        if (!dbUser) {
          dbUser = await User.create({
            email: user.email,
            uid: user.id,
            createdAt: new Date(),
            courses: [],
            university: null,
            role: null,
          });
        }

        token.user = dbUser;
      } else if (
        token.expiresAt &&
        Date.now() > token.expiresAt - 5 * 60 * 1000
      ) {
        const refreshedTokens = await refreshAccessToken(token.refreshToken);
        if (refreshedTokens) {
          token.accessToken = refreshedTokens.access_token;
          token.expiresAt = Date.now() + refreshedTokens.expires_in * 1000;
          console.log("token is refreshed and new token is now active");
        }
      }

      return token;
    },

    session: async ({ session, token }) => {
      session.accessToken = token.accessToken;
      session.refreshToken = token.refreshToken;
      session.expiresAt = token.expiresAt;
      
      // Add user role, courses, and university to session.user
      if (token.user) {
        session.user.role = token.user.role;
        session.user.courses = token.user.courses;
        session.user.university = token.user.university;
      }

      if (typeof window !== "undefined") {
        localStorage.setItem("expiryTime", token.expiresAt);
      }

      console.log(session.refreshToken);
      return session;
    },
  
    async redirect({ url, baseUrl }) {
      return baseUrl
    },
  },
};

const handler = NextAuth(authOptions);

export { handler as GET, handler as POST };
