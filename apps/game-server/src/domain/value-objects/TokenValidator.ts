import jwt from 'jsonwebtoken';

export class TokenValidator {
  private secretKey: string;

  constructor(secretKey: string) {
    this.secretKey = secretKey;
  }

  validate(token: string): boolean {
    try {
      jwt.verify(token, this.secretKey);
      return true;
    } catch (error) {
      return false;
    }
  }
}
