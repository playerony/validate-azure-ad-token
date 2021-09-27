import { JwtPayload } from 'jsonwebtoken';

import { IValidationOptions } from '..';

export function validateTokenClaims(
  tokenPayload: JwtPayload,
  { scopes, audience, tenantId, applicationId }: IValidationOptions,
): void {
  // tenantId
  if (!tokenPayload.tid) {
    throw new Error(`The token's payload does not contain "tid" property`);
  }

  const isValidTenantId = tokenPayload.tid === tenantId;
  if (!isValidTenantId) {
    throw new Error(`The token's payload contains different tenantId`);
  }

  // applicationId
  if (!tokenPayload.appid) {
    throw new Error(`The token's payload does not contain "appid" property`);
  }

  const isValidApplicationId = tokenPayload.appid === applicationId;
  if (!isValidApplicationId) {
    throw new Error(`The token's payload contains different applicationId`);
  }

  // audience
  if (!tokenPayload.aud) {
    throw new Error(`The token's payload does not contain "aud" property`);
  }

  const isValidAudience = tokenPayload.aud === audience;
  if (!isValidAudience) {
    throw new Error(`The token's payload contains different audience`);
  }

  // security token service
  if (!tokenPayload.iss) {
    throw new Error(`The token's payload does not contain "iss" property`);
  }

  const isValidSecurityTokenService =
    tokenPayload.iss.includes('sts') && tokenPayload.iss.includes(tenantId);
  if (!isValidSecurityTokenService) {
    throw new Error(`The token's payload contains different security token service`);
  }

  // scopes
  if (!tokenPayload.scp) {
    throw new Error(`The token's payload does not contain "scp" property`);
  }

  if (typeof tokenPayload.scp !== 'string') {
    throw new Error(`The token's payload scopes are not a string value`);
  }

  const scopesAsArray = tokenPayload.scp.split(' ');
  const hasValidScopes = scopes.every((_scope) => scopesAsArray.includes(_scope));
  if (!hasValidScopes) {
    throw new Error(`The token's payload contains different scopes`);
  }
}
