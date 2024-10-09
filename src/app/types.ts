type TCarHistoryDataRow = {
    rowName: string
    rowSum: string
}

export type TCarHistoryData = {
    date: string,
    docErr: string,
    docId:string,
    docFirm: string,
    docManager: string,
    docInfo: string,
    docSum: string,
    carMileage: string,
    isPosted: string,
    rowList: TCarHistoryDataRow[],
    rowName: string
}

export type TCarHistoryResponse = {
    carHistoryData: TCarHistoryData[],
    carMileage: number,
    carName: string,
    status: string,
    statusDescription: string
}