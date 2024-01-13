import jwt from 'jsonwebtoken';
import { Ulid } from './Ulid';

export class TokenGenerator {
  private secretKey: string;

  constructor(secretKey: string) {
    this.secretKey = secretKey;
  }

  generate(userId: Ulid): string {
    const token = jwt.sign({ userId: userId.get() }, this.secretKey, { expiresIn: '1d' });
    return token;
  }
}
