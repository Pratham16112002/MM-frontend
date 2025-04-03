import { httpWrapper, responseErrorHandler, responseHandler } from '@/utils';
import { Response } from '../axiosConfig';
import { APIError } from '@/utils/Exception';

export async function refreshToken(refreshToken: string): Promise<Response> {
  try {
    const response = await httpWrapper.POST(false, 'api/user/refresh-token', {
      refreshToken: refreshToken,
    });
    return responseHandler(response);
  } catch (error: unknown) {
    const res_error = responseErrorHandler(error);
    throw new APIError(res_error.message, res_error.code);
  }
}
