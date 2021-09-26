import { decodeAccessToken } from './utils/decode-access-token';
import { validateTokenHeader } from './utils/validate-token-header';

/**
 * @packageDocumentation Simple function to validate access token received from azure active directory. Useful when you're using a msal library to authenticate users on the frontend and you wanna verify Microsoft tokens in the API.
 */

/**
 * Validate azure active directory access token
 *
 * @param accessToken - valid access token received from azure
 *
 * @public
 */
export async function validate(accessToken: string): Promise<void> {
  const decodedAccessToken = decodeAccessToken(accessToken);
  if (!decodedAccessToken) {
    throw new Error('The access token could not be decoded');
  }

  try {
    await validateTokenHeader(decodedAccessToken.header, '123', '123');
  } catch (error: unknown) {
    console.log(error);
  }
}
