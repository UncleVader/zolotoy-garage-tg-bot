type TCarHistoryDataRow = {
    rowName: string
    rowSum: string
}

export type TCarHistoryData = {
    carMileage: string,
    date: string,
    docErr: string,
    docFirm: string,
    docId:string,
    docInfo: string,
    docManager: string,
    docSum: string,
    isPosted: string,
    rowList: TCarHistoryDataRow[],
    rowName: string
}

export type TCarHistory = {
    carMileage: number,
    carName: string,
    carHistoryData: TCarHistoryData[]
}

export type TCarListItem = {
    automobileNumber: string,
    id: string,
    carHistory: TCarHistory
}

export type TCarHistoryResponse = {
    carList: TCarListItem[],
    status: string,
    statusDescription: string
}