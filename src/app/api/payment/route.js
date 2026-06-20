// /api/payment/route.js
import { NextResponse } from "next/server";
import crypto from "crypto";

export async function POST(req) {
    const { orderId, homeTitle } = await req.json();

    const publicKey = process.env.EPOINT_PUBLIC_KEY;   // "i000201616"
    const privateKey = process.env.EPOINT_PRIVATE_KEY; // "9JUMbwpTbMHYlAHIePU8CgKI"

    const data = {
        public_key: publicKey,
        amount: "170.00",          // STRING, decimal formatda — Epoint nümunəsindəki kimi
        currency: "AZN",
        language: "az",
        order_id: orderId,
        description: `Beh - ${homeTitle}`,
        success_redirect_url: "https://area36.az/payment/success",
        error_redirect_url: "https://area36.az/payment/error",
        result_url: "https://area36.az/payment/result",
    };

    const payload = JSON.stringify(data);
    const dataBase64 = Buffer.from(payload).toString("base64");

    // EPOINT-İN RƏSMİ ALQORİTMİ: sha1(privateKey + data + privateKey), HMAC DEYİL
    const signature = Buffer.from(
        crypto
            .createHash("sha1")
            .update(privateKey + dataBase64 + privateKey)
            .digest()
    ).toString("base64");

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