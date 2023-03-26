import { AxiosError, AxiosResponse } from 'axios';

const isAxiosError = <TError>(error: unknown): error is AxiosError<TError> =>
  !!error && typeof error === 'object' && (error as AxiosError<TError>).isAxiosError;

export const axiosTryCatchWrapper = async <TResponse = unknown, TError = unknown>(
  axiosFunctionToExecute: () => Promise<AxiosResponse<TResponse>>,
  defaultErrorMessage = 'Internal Server Error',
): Promise<AxiosResponse<TResponse>> => {
  try {
    return await axiosFunctionToExecute();
  } catch (error: unknown) {
    if (isAxiosError<TError>(error)) {
      if (error.response) {
        const { data, status } = error.response;

        throw new Error(JSON.stringify({ data, status }));
      }

      if (error.request) {
        const { data, status } = error.request;

        throw new Error(JSON.stringify({ data, status }));
      }
    }

    if (error instanceof Error) {
      throw new Error(error.message);
    }

    if (typeof error === 'string') {
      throw new Error(error);
    }

    throw new Error(defaultErrorMessage);
  }
};
