import { NextResponse } from "next/server";
import { auth, currentUser } from "@clerk/nextjs";
import * as Ably from 'ably'

export async function GET(request: Request) {
  const user = await currentUser();

  if (!process.env.NEXT_ABLY_API_KEY) {
    return NextResponse.json({ errorMessage: `Missing NEXT_ABLY_API_KEY environment variable.
      If you're running locally, please ensure you have a ./.env file with a value for NEXT_ABLY_API_KEY=your-key.
      Please see README.md for more details on configuring your Ably API Key.`,
    },{ 
      status: 500
    })
  };

  //const clientId = Math.random().toString(36).substring(2, 15) + Math.random().toString(36).substring(2, 15);

  const client = new Ably.Realtime.Promise(process.env.NEXT_ABLY_API_KEY);
  
  const tokenRequestData = await client.auth.createTokenRequest({ clientId: user?.username as string });
  //const tokenRequestData = await client.auth.createTokenRequest({ clientId });

  console.log(`Token: ${JSON.stringify(tokenRequestData)}`)
  return NextResponse.json(tokenRequestData);
}
