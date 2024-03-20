export interface ITableLogResponse {
    id: string;
    tableId: string;
    gameId: string | null;
    type: string;
    params: string;
    comment: string;
    createdAt: string;
    updatedAt: string;
}
