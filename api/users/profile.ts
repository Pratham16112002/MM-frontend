import { APIError } from '@/utils/Exception';
import { Response } from '../axiosConfig';
import { httpWrapper, responseErrorHandler, responseHandler } from '@/utils';

interface ChangeUsernamePayload {
  email: string;
  username: string;
}

export async function ChangeUsername(
  payload: ChangeUsernamePayload,
): Promise<Response> {
  try {
    const response = await httpWrapper.POST(
      false,
      'api/user/username',
      payload,
    );
    return responseHandler(response);
  } catch (error: unknown) {
    const response = responseErrorHandler(error);
    throw new APIError(response.message, response.code);
  }
}

interface ProfilePayload {
  payload: ChangeUsernamePayload;
  formData: FormData;
}

export async function SetUpProfile(payload: ProfilePayload): Promise<Response> {
  const usernameResponse = await ChangeUsername(payload.payload);
  const profileUploadResponse = await ChangeProfilePic(payload.formData);

  //if both username and profile uploaded
  if (usernameResponse.success && profileUploadResponse.success) {
    return {
      code: 200,
      data: { usernameResponse, profileUploadResponse },
      message: 'profile created successfuly',
      success: true,
    };
  }

  // if only username created
  if (usernameResponse.success) {
    return {
      code: 200,
      data: { usernameResponse },
      message: 'username created!',
      success: true,
    };
  }
  throw new APIError(usernameResponse.message, 400);
}

export async function ChangeProfilePic(formData: any): Promise<Response> {
  try {
    const response = await httpWrapper.POSTFormData(
      false,
      'api/user/upload-profile-picture',
      formData,
    );
    return responseHandler(response);
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
  } catch (error: any) {
    const response = responseErrorHandler(error);
    throw new APIError(response.message, response.code);
  }
}
