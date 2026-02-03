import { NextResponse } from "next/server";
import { TwitterApi } from "twitter-api-v2";

console.log("call")
export async function GET() {
  try {
    // 1️⃣ Init Twitter client (OAuth 1.0a)
    const client = new TwitterApi({
      appKey: process.env.TWITTER_API_KEY!,
      appSecret: process.env.TWITTER_API_SECRET!,
      accessToken: process.env.TWITTER_ACCESS_TOKEN!,
      accessSecret: process.env.TWITTER_ACCESS_SECRET!,
    }).readWrite;

    // 2️⃣ Download a test image
    const imageUrl =
      "https://upload.wikimedia.org/wikipedia/commons/4/47/PNG_transparency_demonstration_1.png";

    const res = await fetch(imageUrl);
    const buffer = Buffer.from(await res.arrayBuffer());

    // 3️⃣ Upload image (v1.1 internally)
    const mediaId = await client.v1.uploadMedia(buffer, {
      mimeType: "image/png",
    });

    // ✅ SUCCESS
    return NextResponse.json({
      success: true,
      mediaId,
    });

  } catch (error: any) {
    console.error("MEDIA UPLOAD FAILED:", error);
    return NextResponse.json(
      {
        success: false,
        error: error.message,
      },
      { status: 500 }
    );
  }
}
