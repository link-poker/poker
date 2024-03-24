export interface IPlayerInfoForOthersResponse {
    id: string;
    name: string;
    stack: number;
    bet: number;
    raise?: number;
    holeCards?: string[];
    folded: boolean;
    showCards: boolean;
    left: boolean;
    away: boolean;
    hand?: string;
}
