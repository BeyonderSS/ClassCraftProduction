import { NextResponse } from "next/server";
import fetch from "node-fetch";
import PaytmChecksum from "paytmchecksum";

export async function POST(request) {
  try {
    const paytmParams = {
      body: {
        mid: process.env.NEXT_PUBLIC_PAYTMMID,
        linkType: "GENERIC",
        linkDescription: "Test Payment",
        linkName: "Test",
      },
    };
    console.log(paytmParams.body);
    console.log("mid",paytmParams.body.mid)
    // Generate checksum
    const checksum = await PaytmChecksum.generateSignature(
      JSON.stringify(paytmParams.body),
      process.env.PAYTMKEY
    );

    paytmParams.head = {
      tokenType: "AES",
      signature: checksum,
    };
    console.log("checkSum:", checksum);
    const post_data = JSON.stringify(paytmParams);

    console.log("post data:", post_data);
    
    const url = "https://securegw-stage.paytm.in/link/create"; // Staging URL
    // For Production URL, use: const url = "https://securegw.paytm.in/link/create";

    console.log("URL:", url);

    const response = await fetch(url, {
      method: "POST",
      body: post_data,
      headers: {
        "Content-Type": "application/json",
      },
    });

    if (!response.ok) {
      throw new Error(`HTTP error! Status: ${response.status}`);
    }

    const responseBody = await response.json();
    console.log("Response: ", responseBody);

    return NextResponse.json({ paytmResponse: responseBody });
  } catch (error) {
    console.error("Error:", error);
    return NextResponse.error(new Error("Internal Server Error"));
  }
}
