import { NextResponse } from "next/server";
import crypto from "crypto";

export async function POST(req) {
    const { orderId, homeTitle } = await req.json();

    const publicKey = process.env.EPOINT_PUBLIC_KEY;
    const privateKey = process.env.EPOINT_PRIVATE_KEY;

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

    const signature = crypto
        .createHmac("sha1", privateKey)
        .update(dataBase64)
        .digest("base64");

    const response = await fetch("https://epoint.az/api/1/request", {
        method: "POST",
        headers: { "Content-Type": "application/x-www-form-urlencoded" },
        body: new URLSearchParams({ data: dataBase64, signature }).toString(),
    });

    const result = await response.json();

    if (result.status === "success") {
        return NextResponse.json({ redirect_url: result.redirect_url });
    } else {
        return NextResponse.json({ error: result.message }, { status: 400 });
    }
}