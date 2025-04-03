import { httpWrapper, responseErrorHandler, responseHandler } from '@/utils';
import { Response } from '../axiosConfig';
import { APIError } from '@/utils/Exception';

export async function GetPersonalizedPickItems(): Promise<Response> {
  try {
    const response = await httpWrapper.GET(true, 'api/recom/personalized');
    return responseHandler(response);
  } catch (error) {
    const res_error = responseErrorHandler(error);
    throw new APIError(res_error.message, res_error.code);
  }
}