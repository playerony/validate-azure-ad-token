import { decodeAccessToken } from './utils/decode-access-token';
import { validateTokenHeader } from './utils/validate-token-header';
import { validateTokenClaims } from './utils/validate-token-claims';
import { validateTokenWithGraphApi } from './utils/validate-token-with-graph-api';

/**
 * @packageDocumentation Function to validate access token received from azure active directory. Useful when you're using a msal library to authenticate users on the frontend and you wanna verify Microsoft tokens in the API.
 */

/**
 * The interface represents required fields to process access token validation
 *
 * @public
 */
export interface IValidationOptions {
  /**
   * Your Microsoft 365 tenant ID is a globally unique identifier (GUID) that is different than your organization name or domain.
   */
  tenantId: string;

  /**
   * The set of scopes exposed by your application for which the client application has requested (and received) consent.
   */
  scopes: string[];

  /**
   * Identifies the intended recipient of the token - its audience. In v2.0 tokens, this is always the client ID of the API, while in v1.0 tokens it can be the client ID or the resource URI used in the request, depending on how the client requested the token.
   */
  audience: string;

  /**
   * Only present in v1.0 tokens. The application ID of the client using the token. The application can act as itself or on behalf of a user. The application ID typically represents an application object, but it can also represent a service principal object in Azure AD.
   */
  applicationId: string;
}

/**
 * Validate azure active directory access token
 *
 * @param accessToken - valid access token received from azure
 *
 * @public
 */
export async function validate(
  accessToken: string,
  { scopes, audience, tenantId, applicationId }: IValidationOptions,
): Promise<void> {
  const decodedAccessToken = decodeAccessToken(accessToken);
  if (!decodedAccessToken) {
    throw new Error('The access token could not be decoded');
  }

  await validateTokenHeader(decodedAccessToken.header, tenantId, applicationId);

  validateTokenClaims(decodedAccessToken.payload, {
    scopes,
    audience,
    tenantId,
    applicationId,
  });

  await validateTokenWithGraphApi(accessToken, decodedAccessToken.payload);
}
