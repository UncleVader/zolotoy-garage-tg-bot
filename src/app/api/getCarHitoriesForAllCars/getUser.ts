import axios from "axios";

type TUserResponse = {
    status: string;
    statusDescription: string;
    token: string;
    userId: string;
    userName: string;
    workAreaAddress: string;
    doNotLimitWorkAreaAddress: string;
};

export async function getUser(): Promise<TUserResponse | null>{
    try {
        console.log('getting token')
        const response = await axios.get(
            `${process.env.API_ORIGINAL_SERVER_URL}/UserInfo?barcode=${process.env.API_BARCODE}`,
            {
                headers: {
                    "do-not-limit-work-area-address": "true",
                },
            }
        );
        console.log('got token')
        return response.data;
    } catch (error) {
        console.error("Error fetching user data", error);
        return null;
    }
};