import { UserFactory } from '../../../src/domain/factories/UserFactory';
import { UserName } from '../../../src/domain/value-objects/UserName';
import { TokenValidator } from '../../../src/domain/value-objects/TokenValidator';
import { TokenGenerator } from '../../../src/domain/value-objects/TokenGenerator';

export const AUTH_TOKEN_SECRET_KEY_BASE64 = 'tsPqOYfJCGGMGdIo+sUSGc67c0GQH/3w9Pc8D+ILuno=';

describe('TokenValidator', () => {
  let tokenGenerator: TokenGenerator;
  let tokenValidator: TokenValidator;

  beforeAll(() => {
    tokenGenerator = new TokenGenerator(AUTH_TOKEN_SECRET_KEY_BASE64);
    tokenValidator = new TokenValidator(AUTH_TOKEN_SECRET_KEY_BASE64);
  });

  it('should be able to validate auth token', () => {
    const userFactory = new UserFactory();
    const user = userFactory.create(new UserName('Alice'));
    const token = tokenGenerator.generate(user);
    const validatedUser = tokenValidator.validate(token);
    expect(validatedUser).toEqual(user);
  });
});
