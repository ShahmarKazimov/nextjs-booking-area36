import { NextResponse } from "next/server";
import crypto from "crypto";

export async function POST(req) {
    try {
        const { orderId, homeTitle } = await req.json();

        const publicKey = process.env.EPOINT_PUBLIC_KEY?.trim();
        const privateKey = process.env.EPOINT_PRIVATE_KEY?.trim();

        if (!publicKey || !privateKey) {
            return NextResponse.json(
                { error: "Missing API keys" },
                { status: 500 }
            );
        }

        // 1. Data object (strict structure)
        const data = {
            public_key: publicKey,
            amount: 170,
            currency: "AZN",
            language: "az",
            order_id: String(orderId),
            description: `Beh - ${homeTitle}`,
            success_redirect_url: "https://area36.az/payment/success",
            error_redirect_url: "https://area36.az/payment/error",
        };

        // 2. Canonical JSON string (IMPORTANT)
        const dataString = JSON.stringify(data);

        // 3. Base64 encode (for request body)
        const dataBase64 = Buffer.from(dataString, "utf8").toString("base64");

        // 4. SIGNATURE (CRITICAL FIX)
        // 👉 ePoint çox vaxt RAW JSON üzərində signature gözləyir
        const signature = crypto
            .createHmac("sha1", privateKey)
            .update(dataString) // ❗ base64 yox, JSON string
            .digest("hex");

        // 5. Request to ePoint
        const response = await fetch("https://epoint.az/api/1/request", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({
                data: dataBase64,
                signature: signature,
            }),
        });

        const result = await response.json();

        console.log("EPOINT RESPONSE:", result);

        if (result.status === "success") {
            return NextResponse.json({
                redirect_url: result.redirect_url,
            });
        }

        return NextResponse.json(
            { error: result.message || "Payment failed" },
            { status: 400 }
        );
    } catch (err) {
        console.error("EPOINT ERROR:", err);
        return NextResponse.json(
            { error: "Server error" },
            { status: 500 }
        );
    }
}