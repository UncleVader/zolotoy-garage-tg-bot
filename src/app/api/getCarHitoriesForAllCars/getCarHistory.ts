import { TCarHistoryResponse } from "@/app/types";
import axios from "axios";

export async function getCarHistory(userToken:string, carId: string): Promise<TCarHistoryResponse | null>{
    try {
        console.log('getting car history',carId)
        const response = await axios.get(`${process.env.API_ORIGINAL_SERVER_URL}/CarHistory?searchBy=${carId}`, {
            headers: {
                "User-Token": userToken,
                "do-not-limit-work-area-address": "true",
            },
        });
        console.log('got car history')

        return response.data;
    } catch (error) {
        console.error("Error fetching car history", error);
        return null;
    }
}