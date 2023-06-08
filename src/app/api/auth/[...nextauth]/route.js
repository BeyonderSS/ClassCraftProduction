import NextAuth from "next-auth";
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
            "openid profile email https://www.googleapis.com/auth/drive.file https://www.googleapis.com/auth/classroom.courses.readonly https://www.googleapis.com/auth/classroom.courses https://www.googleapis.com/auth/classroom.rosters https://www.googleapis.com/auth/classroom.announcements.readonly",
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
        token.expiresAt = Date.now() + 60 * 60 * 1000; // Set expiry time to 1 hour from login time
      } else if (token.expiresAt && Date.now() > token.expiresAt - 5 * 60 * 1000) { // Check if expiry time is getting near (within 5 minutes)
        const refreshedTokens = await refreshAccessToken(token.refreshToken);
        if (refreshedTokens) {
          token.accessToken = refreshedTokens.access_token;
          token.expiresAt = Date.now() + refreshedTokens.expires_in * 1000;
          console.log("token is refrshed and new token is now active")
        }
      }

      return token;
    },
    session: async ({ session, token }) => {
      session.accessToken = token.accessToken;
      session.refreshToken = token.refreshToken;
      session.expiresAt = token.expiresAt;
      if (typeof window !== 'undefined') {
        localStorage.setItem('expiryTime', token.expiresAt);
      }
      console.log(session.refreshToken);
      return session;
    },
  },
};

const handler = NextAuth(authOptions);

export { handler as GET, handler as POST };
