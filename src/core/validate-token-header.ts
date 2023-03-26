import axios from 'axios';
import { JwtHeader } from 'jsonwebtoken';

import { objectStorageFactory } from './object-storage-factory';
import { axiosTryCatchWrapper } from './axios-try-catch-wrapper';

interface IDiscoveryKeysData {
  keys: [{ kid: string }];
}

const objectStorage = objectStorageFactory();

const getDiscoveryKeysApiUrl = (tenantId: string, applicationId: string) =>
  `https://login.microsoftonline.com/${tenantId}/discovery/keys?appid=${applicationId}`;

async function callDiscoveryKeysApi(tenantId: string, applicationId: string) {
  const discoveryKeysApiUrl = getDiscoveryKeysApiUrl(tenantId, applicationId);

  return axios.get<IDiscoveryKeysData>(discoveryKeysApiUrl);
}

export async function validateTokenHeader(
  tokenHeader: JwtHeader,
  tenantId: string,
  applicationId: string,
): Promise<void> {
  if (!tokenHeader.kid) {
    throw new Error('Token header does not contain "kid" property');
  }

  if (objectStorage.getItem(tokenHeader.kid)) {
    return;
  }

  const { data } = await axiosTryCatchWrapper(
    () => callDiscoveryKeysApi(tenantId, applicationId),
    'Discovery Keys API throws an error',
  );

  const isValidPublicKey = data.keys.some((_key) => _key.kid === tokenHeader.kid);

  if (!isValidPublicKey) {
    throw new Error('The public key retrieved from the token header is invalid');
  }

  objectStorage.setItem(tokenHeader.kid, 'valid');
}
