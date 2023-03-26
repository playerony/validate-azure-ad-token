import axios from 'axios';
import { JwtPayload } from 'jsonwebtoken';

import { axiosTryCatchWrapper } from './axios-try-catch-wrapper';

interface IGraphApiResponse {
  id: string;
}

const callGraphApi = async (accessToken: string) =>
  axios.get<IGraphApiResponse>('https://graph.microsoft.com/v1.0/me', {
    headers: { authorization: `Bearer ${accessToken}` },
  });

export const validateTokenWithGraphApi = async (accessToken: string, tokenPayload: JwtPayload): Promise<void> => {
  if (!tokenPayload.oid) {
    throw new Error('The token\'s payload does not contain "oid" property');
  }

  const response = await axiosTryCatchWrapper(() => callGraphApi(accessToken), 'Graph API tells your token is invalid');

  const isSameId = response.data.id === tokenPayload.oid;

  if (!isSameId) {
    throw new Error('The token`s payload "oid" value does not match with "id" one from graph API');
  }
};
