import { httpWrapper, responseErrorHandler, responseHandler } from '@/utils';
import { Response } from '../axiosConfig';
import { APIError } from '@/utils/Exception';

export async function GetIncomingRequests(): Promise<Response> {
  try {
    const response = await httpWrapper.GET(true, 'api/peer/request/incoming');
    return responseHandler(response);
  } catch (error) {
    const res_error = responseErrorHandler(error);
    throw new APIError(res_error.message, res_error.code);
  }
}

export async function ResponseVerdict(
  username: string,
  status: 'accepted' | 'rejected',
): Promise<Response> {
  try {
    const response = await httpWrapper.POST(true, 'api/peer/request/verdict', {
      username: username,
      status: status,
    });
    return responseHandler(response);
  } catch (error) {
    const res_error = responseErrorHandler(error);
    throw new APIError(res_error.message, res_error.code);
  }
}

export async function GetFollowers(): Promise<Response> {
  try {
    const response = await httpWrapper.GET(true, 'api/peer/followers');
    return responseHandler(response);
  } catch (error) {
    const res_error = responseErrorHandler(error);
    throw new APIError(res_error.message, res_error.code);
  }
}

export async function GetFollowing(): Promise<Response> {
  try {
    const response = await httpWrapper.GET(true, 'api/peer/following');
    return responseHandler(response);
  } catch (error) {
    const res_error = responseErrorHandler(error);
    throw new APIError(res_error.message, res_error.code);
  }
}

export async function GetFriends(query: string): Promise<Response> {
  try {
    const response = await httpWrapper.GET(
      true,
      `api/peer/search?username=${query}`,
    );
    return responseHandler(response);
  } catch (error) {
    const res_error = responseErrorHandler(error);
    throw new APIError(res_error.message, res_error.code);
  }
}

export async function Unfollow(username: string): Promise<Response> {
  try {
    const response = await httpWrapper.DELETE(
      true,
      `api/peer/unfollow/${username}`,
    );
    return responseHandler(response);
  } catch (error) {
    const res_error = responseErrorHandler(error);
    throw new APIError(res_error.message, res_error.code);
  }
}
