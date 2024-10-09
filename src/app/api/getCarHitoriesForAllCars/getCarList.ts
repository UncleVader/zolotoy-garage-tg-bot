import axios from "axios";

type TCarList = {
    automobileNumber: string,
    id: string
}

type TCarListResponse = {
    carList: TCarList[],
    status: string,
    statusDescription: string
}

export async function getCarList(userToken:string, phone: string): Promise<TCarListResponse | null | {error: unknown}>{
    try {
        console.log('getting cars list for phone', phone)
        const response = await axios.get(`${process.env.API_ORIGINAL_SERVER_URL}/CarList?phone=${phone}`, {
            headers: {
                "User-Token": userToken,
                "do-not-limit-work-area-address": "true",
            },
        });
        console.log('got cars list')

        return response.data;
    } catch (error) {
        console.error("Error fetching car list", error);
        return {error};
    }
}