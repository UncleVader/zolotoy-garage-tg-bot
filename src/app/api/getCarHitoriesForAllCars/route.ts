import { NextRequest, NextResponse } from "next/server";
import axios from "axios";

export const GET = async (req: NextRequest): Promise<NextResponse> => {
    const { searchParams } = new URL(req.url);

    try {
        const phone = searchParams.get("phone") || "";

        if (!phone || typeof phone !== 'string') {
            return NextResponse.json({ error: 'Phone parameter is required and must be a string' }, {status: 400});
        }

        const response = await axios.get(
            `${process.env.API_ORIGINAL_SERVER_URL}/ClientHistory?=${process.env.API_BARCODE}`,
            {
                headers: {
                    "do-not-limit-work-area-address": "true",
                },
            }
        );

        return NextResponse.json(response.data, {status: 200});
    } catch (error) {
        console.error("Error fetching car histories for all cars", error)
        return NextResponse.json({ error: "Internal server error" }, {status: 500});
    }
}