import NextAuth from "next-auth";
import SpotifyProvider from "next-auth/providers/spotify";
import spotifyApi, { LOGIN_URL } from '../../../lib/spotify';

async function refreshAccessToken(token) {
  try {
    spotifyApi.setAccessToken(token.accessToken); // old token
    spotifyApi.setRefreshToken(token.refreshToken); // refresh token

    // send both these tokens to get a new valid accessToken back
    const { body: refreshedToken } = await spotifyApi.refreshAccessToken();
    console.log('Refreshed Token IS: ', refreshedToken);

    return {
      ...token,
      accessToken: refreshedToken.access_token,
      accessTokenExpires: Date.now + refreshedToken.expires_in * 1000, // = 1 hour as 3600 returns from Spotify
      refreshToken: refreshedToken.refresh_token ?? token.refreshToken, // if the new refresh_token exists, use it, otherwise use the old one.
    };

  } catch (error) {
    console.log('error: ');
    console.error(error);

    return {
      ...token,
      error: 'RefreshAccessTokenError',
    };
  }
}

export default NextAuth({
  // Configure one or more authentication providers
  providers: [
    SpotifyProvider({
      clientId: process.env.NEXT_PUBLIC_CLIENT_ID,
      clientSecret: process.env.NEXT_PUBLIC_CLIENT_SECRET,
      authorization: LOGIN_URL,
    }),
    // ...add more providers here
  ],
  // When you log into spotify it gives you a JWT Token that we can use 
  // in this app to authenticate a user.
  secret: process.env.JWT_SECRET,
  pages: {
    signIn: '/login',
  },
  callbacks: {
    async jwt({ token, account, user }) {
      // on a successful spotify login, you should get back an Account variable and a User variable
      // for more info: https://next-auth.js.org/tutorials/refresh-token-rotation
      // if initial sign in
      if (account && user) {
        console.log('account object: ');
        console.dir(account);
        console.log('end account object');
        return {
          ...token,
          accessToken: account.access_token,
          refreshToken: account.refresh_token,
          username: account.providerAccountId,
          accessTokenExpires: account.expires_at * 1000,
        };
      }
      // if the access token has not expired yet, Return previous token 
      if (Date.now() < token.accessTokenExpires) {
        console.log('EXISTING TOKEN IS VALID');
        return token;
      }
      // otherwise...
      console.log('ACCESS TOKEN HAS EXPIRED, refreshing...');
      return await refreshAccessToken(token);
      
    },
    // Create A NextAuth Session object from the Token we got back from Spotify
    async session({ session, token }) {
      session.user.accessToken = token.accessToken;
      session.user.refreshToken = token.refreshToken;
      session.user.username = token.username;

      return session;
    },

  },

});
