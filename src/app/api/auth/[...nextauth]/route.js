// app/api/auth/[...nextauth]/route.js

import NextAuth, { AuthOptions } from "next-auth";
import GoogleProvider from "next-auth/providers/google";
import axios from "axios";

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
            "openid profile email https://www.googleapis.com/auth/drive.file https://www.googleapis.com/auth/classroom.courses.readonly https://www.googleapis.com/auth/classroom.courses https://www.googleapis.com/auth/classroom.rosters",
        },
      },
    }),
  ],
  httpTimeout: 10000,
  jwt: {
    secret: process.env.JWT_SECRET,
  },
  callbacks: {
    jwt: async ({ token, account, user }) => {
      if (account) {
        token.accessToken = account.access_token;
        token.refreshToken = account.refresh_token;
        token.expiresAt = Date.now() + account.expires_in * 1000;
      } else if (token.expiresAt && Date.now() > token.expiresAt) {
        const refreshedTokens = await refreshAccessToken(token.refreshToken);
        if (refreshedTokens) {
          token.accessToken = refreshedTokens.access_token;
          token.expiresAt = Date.now() + refreshedTokens.expires_in * 1000;
        }
      }

      return token;
    },

    session: async ({ session, token }) => {
      session.accessToken = token.accessToken;
      session.refreshToken = token.refreshToken;
      console.log(session.refreshToken);
      return session;
    },
  },
};

const handler = NextAuth(authOptions);

export { handler as GET, handler as POST };
