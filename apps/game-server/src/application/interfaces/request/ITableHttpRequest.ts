export type CreateAsUserRequest = {
  body: {
    currency: string;
    smallBlind: number;
    bigBlind: number;
    buyIn: number;
  };
};

export type SitDownAsUserRequest = {
  path: {
    tableId: string;
  };
  body: {
    stack: number;
    seatNumber: number;
  };
};

export type CreateAsGuestRequest = {
  body: {
    name: string;
    currency: string;
    smallBlind: number;
    bigBlind: number;
    buyIn: number;
  };
};

export type SitDownAsGuestRequest = {
  path: {
    tableId: string;
  };
  body: {
    name: string;
    stack: number;
    seatNumber: number;
  };
};
