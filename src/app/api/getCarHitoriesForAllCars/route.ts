import { NextRequest, NextResponse } from "next/server";
import axios from "axios";

export const GET = async (req: NextRequest): Promise<NextResponse> => {
    const { searchParams } = new URL(req.url);

    try {
        const phone = (searchParams.get("phone") || "").trim();

        if (!phone || typeof phone !== 'string') {
            const errorMessage = 'Phone parameter is required and must be a string'
            console.error(errorMessage)
            return NextResponse.json({ error: errorMessage }, {status: 400});
        }

        const url = `${process.env.API_URL}/ClientHistory?phone=${phone}`
        console.log(`getting history ${url}`)
        const response = await axios.get(url);
        console.log('got it')

        return NextResponse.json(response.data, {status: 200});
    } catch (error) {
        console.error("Error fetching car histories for all cars", error)
        return NextResponse.json({ error: "Internal server error" }, {status: 500});
    }
}