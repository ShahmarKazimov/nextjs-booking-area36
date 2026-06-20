// /api/payment/route.js
import { NextResponse } from "next/server";
import crypto from "crypto";

export async function POST(req) {
    const { orderId, homeTitle } = await req.json();

    const publicKey = process.env.EPOINT_PUBLIC_KEY;   
    const privateKey = process.env.EPOINT_PRIVATE_KEY; 

    // DEBUG: key-ləri yoxla
    console.log("PUBLIC KEY:", publicKey);
    console.log("PRIVATE KEY:", privateKey);

    const data = {
        public_key: publicKey,
        amount: 170,
        currency: "AZN",
        language: "az",
        order_id: orderId,
        description: `Beh - ${homeTitle}`,
        success_redirect_url: "https://area36.az/payment/success",
        error_redirect_url: "https://area36.az/payment/error",
    };

    const dataBase64 = Buffer.from(JSON.stringify(data)).toString("base64");

    // BASE64 imza - HEX deyil
    const signature = crypto
        .createHmac("sha1", privateKey)
        .update(dataBase64)
        .digest("base64");

    // DEBUG: nə göndərdiyini gör
    console.log("DATA JSON:", JSON.stringify(data));
    console.log("DATA BASE64:", dataBase64);
    console.log("SIGNATURE:", signature);

    const response = await fetch("https://epoint.az/api/1/request", {
        method: "POST",
        headers: { "Content-Type": "application/x-www-form-urlencoded" },
        body: new URLSearchParams({ data: dataBase64, signature }).toString(),
    });

    const result = await response.json();
    console.log("EPOINT RESPONSE:", JSON.stringify(result));

    if (result.status === "success") {
        return NextResponse.json({ redirect_url: result.redirect_url });
    } else {
        return NextResponse.json({ error: result.message }, { status: 400 });
    }
}