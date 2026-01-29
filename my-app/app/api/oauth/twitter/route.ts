import { requireUser } from "@/lib/session";
import { redirect } from "next/navigation";
import { NextRequest } from "next/server";

export async function GET(req: NextRequest) {
  // 1. Ensure user is logged in
//   console.log("this oauth called.. ")
  await requireUser();
//   console.log("user verified")

  const clientId = process.env.TWITTER_CLIENT_ID!;
  const redirectUri = `${process.env.NEXTAUTH_URL}/api/oauth/twitter/callback`;
    // console.log("redirectedUri;",redirectUri)
  // 2. Scopes: 
  // tweet.write = Post tweets
  // offline.access = Get a Refresh Token (Vital!)
  // users.read = Get their @handle and ID
  const scopes = ["tweet.read", "tweet.write", "users.read", "offline.access"].join(" ");

  // 3. Build Auth URL
  const url = new URL("https://twitter.com/i/oauth2/authorize");
//   console.log("user:urlon the callback route:::::",url)
  url.searchParams.append("response_type", "code");
  url.searchParams.append("client_id", clientId);
  url.searchParams.append("redirect_uri", redirectUri);
  url.searchParams.append("scope", scopes);
  
  // Security parameters (PKCE)
  // In production, use a real random string stored in cookies for 'state'
  url.searchParams.append("state", "state"); 
  url.searchParams.append("code_challenge", "challenge"); 
  url.searchParams.append("code_challenge_method", "plain");
    // console.log("user:url:on:client:backend:oauth:",url)
  return redirect(url.toString());
}