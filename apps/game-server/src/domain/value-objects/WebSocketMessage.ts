import { WebSocketMessageKindEnum, WebSocketMessageKindList } from '@link-poker/constants';
import { z } from 'zod';
import { ValidationError } from '../../error';

type WebSocketMessageValue = {
  kind: WebSocketMessageKindEnum;
  payload: any;
};

export class WebSocketMessage {
  private readonly value: WebSocketMessageValue;

  constructor(value: WebSocketMessageValue) {
    if (!this.isValid(value)) {
      throw new ValidationError('Invalid WebSocketMessage.');
    }
    this.value = value;
  }

  get(): WebSocketMessageValue {
    return this.value;
  }

  toString(): string {
    return JSON.stringify(this.value);
  }

  private isValid(value: WebSocketMessageValue): boolean {
    const schema = z.object({
      kind: z.enum(WebSocketMessageKindList),
      payload: z.any(),
    });
    return schema.safeParse(value).success;
  }
}
