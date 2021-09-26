import axios, { AxiosResponse } from 'axios';

import { JwtPayload } from 'jsonwebtoken';

interface IGraphApiResponse {
  surname: string;
  givenName: string;
  userPrincipalName: string;
}

const callGraphApi = async (
  accessToken: string,
): Promise<AxiosResponse<IGraphApiResponse> | undefined> => {
  try {
    return await axios.get<IGraphApiResponse>('https://graph.microsoft.com/v1.0/me', {
      headers: { authorization: `Bearer ${accessToken}` },
    });
  } catch {
    throw new Error('Graph API tells your token is invalid');
  }
};

export const verifyTokenWithGraphApi = async (
  accessToken: string,
  payload: JwtPayload,
): Promise<void> => {
  const response = await callGraphApi(accessToken);
  if (!response) {
    throw new Error(`Graph API throws an error`);
  }

  const { data } = response;

  const isSameSurname = data.surname === payload.family_name;
  if (!isSameSurname) {
    throw new Error(`The token's payload surname does not match that one from graph API`);
  }

  const isSameFirstname = data.givenName === payload.given_name;
  if (!isSameFirstname) {
    throw new Error(`The token's payload firstname does not match that one from graph API`);
  }

  const isSameEmail = data.userPrincipalName === payload.unique_name;
  if (!isSameEmail) {
    throw new Error(`The token's payload email does not match that one from graph API`);
  }
};
