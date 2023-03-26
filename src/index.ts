import { Jwt } from 'jsonwebtoken';

import { isString } from './core/is-string';
import { decodeAccessToken } from './core/decode-access-token';
import { validateTokenHeader } from './core/validate-token-header';
import { validateTokenClaims } from './core/validate-token-claims';
import { validateTokenWithGraphApi } from './core/validate-token-with-graph-api';

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
   * Only present in v1.0 tokens. The application ID of the client using the token. The application can act as itself or on behalf of a user. The application ID typically represents an application object, but it can also represent a service principal object in Azure AD.
   */
  applicationId: string;

  /**
   * Identifies the intended recipient of the token - its audience. In v2.0 tokens, this is always the client ID of the API, while in v1.0 tokens it can be the client ID or the resource URI used in the request, depending on how the client requested the token.
   */
  audience: string;

  /**
   * The set of scopes exposed by your application for which the client application has requested (and received) consent.
   */
  scopes: string[];

  /**
   * Your Microsoft 365 tenant ID is a globally unique identifier (GUID) that is different than your organization name or domain.
   */
  tenantId: string;
}

/**
 * Validate azure active directory access token
 *
 * @param accessToken - valid access token received from azure
 * @param validationOptions - the interface represents required fields to process access token validation
 *
 * @public
 */
export default async function validate(
  accessToken: string,
  { applicationId, audience, scopes, tenantId }: IValidationOptions,
): Promise<Jwt> {
  if (Array.isArray(scopes) && scopes.length === 0) {
    throw new Error('"scopes" array cannot be empty');
  }

  if (typeof audience !== 'string' || audience.length === 0) {
    throw new Error('"audience" value was not provided');
  }

  if (typeof tenantId !== 'string' || tenantId.length === 0) {
    throw new Error('"tenantId" value was not provided');
  }

  if (typeof applicationId !== 'string' || applicationId.length === 0) {
    throw new Error('"applicationId" value was not provided');
  }

  const decodedAccessToken = decodeAccessToken(accessToken);

  if (!decodedAccessToken) {
    throw new Error('The access token could not be decoded');
  }

  if (isString(decodedAccessToken.payload)) {
    throw new Error('The access token payload is not an object');
  }

  await validateTokenHeader(decodedAccessToken.header, tenantId, applicationId);

  validateTokenClaims(decodedAccessToken.payload, {
    scopes,
    audience,
    tenantId,
    applicationId,
  });

  await validateTokenWithGraphApi(accessToken, decodedAccessToken.payload);

  return decodedAccessToken;
}
