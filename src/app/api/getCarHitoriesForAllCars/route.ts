import { TCarHistoryResponse } from "@/app/types";
import {getUser} from "./getUser";
import {getCarList} from "./getCarList";
import { mapLimit } from "async";
import {getCarHistory} from "./getCarHistory";
import { NextRequest, NextResponse } from "next/server";

export const GET = async (req: NextRequest): Promise<NextResponse> => {
    const { searchParams } = new URL(req.url);

    try {
        const phone = searchParams.get("phone") || "";

        if (!phone || typeof phone !== 'string') {
            return NextResponse.json({ error: 'Phone parameter is required and must be a string' }, {status: 400});
        }

        const user = await getUser();

        if (!user) {
            console.log('User not found');
            return NextResponse.json({ error: 'User not found' }, {status: 404});
        }

        const userToken = user?.token || "";

        const carListResponse = await getCarList(userToken, phone);

        if (!carListResponse || !carListResponse.carList) {
            return NextResponse.json({userToken, user, phone}, {status: 200});
        }

        return NextResponse.json({ carListResponse }, {status: 200});

        const carHistories: TCarHistoryResponse[] = [];

        await new Promise<void>((resolve, reject) => {
            mapLimit(
                carListResponse.carList.map(car => car?.id), 
                1, 
                async (carId:string) => 
                {
                    const carHistory = await getCarHistory(userToken, carId);
                    if (carHistory) {
                        carHistories.push(carHistory);
                    }
                }, (err) => {
                    if (err) {
                        reject(err);
                    } else {
                        resolve();
                    }
                }
            )
        })

        return NextResponse.json(carHistories, {status: 200});
    } catch (error) {
        console.error("Error fetching car histories for all cars", error)
        return NextResponse.json({ error: "Internal server error" }, {status: 500});
    }
}