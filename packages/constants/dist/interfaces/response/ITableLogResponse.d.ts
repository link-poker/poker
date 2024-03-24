export interface ITableLogResponse {
    id: string;
    tableId: string;
    gameId?: string;
    type: string;
    params: string;
    comment: string;
    createdAt: string;
    updatedAt: string;
}
