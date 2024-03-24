import { UserFactory } from '../../../src/domain/factories/UserFactory';
import { AuthTokenGenerator } from '../../../src/domain/value-objects/AuthTokenGenerator';
import { AuthTokenValidator } from '../../../src/domain/value-objects/AuthTokenValidator';
import { UserName } from '../../../src/domain/value-objects/UserName';

export const AUTH_TOKEN_SECRET_KEY_BASE64 = 'tsPqOYfJCGGMGdIo+sUSGc67c0GQH/3w9Pc8D+ILuno=';

describe('AuthTokenValidator', () => {
  let tokenGenerator: AuthTokenGenerator;
  let tokenValidator: AuthTokenValidator;

  beforeAll(() => {
    tokenGenerator = new AuthTokenGenerator(AUTH_TOKEN_SECRET_KEY_BASE64);
    tokenValidator = new AuthTokenValidator(AUTH_TOKEN_SECRET_KEY_BASE64);
  });

  it('should be able to validate auth token', () => {
    const user = UserFactory.create(new UserName('Alice'));
    const token = tokenGenerator.generate(user);
    const validatedUser = tokenValidator.validate(token);
    expect(validatedUser).toEqual(user);
  });
});
