export interface ICreateAsUserRequest {
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

export interface ICreateAsGuestRequest {
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
