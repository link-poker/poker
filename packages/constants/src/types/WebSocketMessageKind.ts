export const WebSocketMessageKindList = [
  'ENTER',
  'SIT_DOWN',
  'DEAL_CARDS',
  'STAND_UP',
  'CALL',
  'CHECK',
  'FOLD',
  'BET',
  'RAISE',
  'ADD_ON',
  'DELAY_TIME',
  'PLAYER_PRIVATE_INFO',
  'TABLE_LOGS',
] as const;
export type WebSocketMessageKindEnum = (typeof WebSocketMessageKindList)[number];
