export interface ICreateTableAsUserRequest {
    body: {
        currency: string;
        smallBlind: number;
        bigBlind: number;
        buyIn: number;
    };
}
export interface ISitDownAsUserRequest {
    params: {
        tableId: string;
    };
    body: {
        stack: number;
        seatNumber: number;
    };
}
export interface ICreateTableAsGuestRequest {
    body: {
        name: string;
        currency: string;
        smallBlind: number;
        bigBlind: number;
        buyIn: number;
    };
}
export interface ISitDownAsGuestRequest {
    params: {
        tableId: string;
    };
    body: {
        name: string;
        stack: number;
        seatNumber: number;
    };
}
export interface IGetTableRequest {
    params: {
        tableId: string;
    };
}
