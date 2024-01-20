export interface CreateAsUserRequest {
  body: {
    currency: string;
    smallBlind: number;
    bigBlind: number;
    buyIn: number;
  };
}

export interface SitDownAsUserRequest {
  path: {
    tableId: string;
  };
  body: {
    stack: number;
    seatNumber: number;
  };
}

export interface CreateAsGuestRequest {
  body: {
    name: string;
    currency: string;
    smallBlind: number;
    bigBlind: number;
    buyIn: number;
  };
}

export interface SitDownAsGuestRequest {
  path: {
    tableId: string;
  };
  body: {
    name: string;
    stack: number;
    seatNumber: number;
  };
}
