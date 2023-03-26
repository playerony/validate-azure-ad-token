import { decode, Jwt } from 'jsonwebtoken';

export const decodeAccessToken = (accessToken: string): Jwt | null =>
  decode(accessToken, { json: true, complete: true });
