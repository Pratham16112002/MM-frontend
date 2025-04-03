import { APIError } from '@/utils/Exception';
import { Response } from '../axiosConfig';
import { httpWrapper, responseErrorHandler, responseHandler } from '@/utils';

interface LoginValues {
  email: string;
  password: string;
}

interface SignUpValues {
  fullName: string;
  email: string;
  password: string;
}

export interface VerifyOTPPayload {
  otp: number;
  email: string;
}

export async function signUp(payload: SignUpValues): Promise<Response> {
  try {
    const response = await httpWrapper.POST(false, 'api/user/signup', payload);
    return responseHandler(response);
  } catch (error: unknown) {
    const res_error = responseErrorHandler(error);
    throw new APIError(res_error.message, res_error.code);
  }
}

export async function resendOTP(email: string): Promise<Response> {
  try {
    const response = await httpWrapper.POST(false, 'api/user/resend-otp', {
      email,
    });
    return responseHandler(response);
  } catch (error: unknown) {
    const res_error = responseErrorHandler(error);
    throw new APIError(res_error.message, res_error.code);
  }
}

export async function verifyOTP(payload: VerifyOTPPayload): Promise<Response> {
  try {
    const response = await httpWrapper.POST(
      false,
      'api/user/verify-otp',
      payload,
    );
    return responseHandler(response);
  } catch (error: unknown) {
    const res_error = responseErrorHandler(error);
    throw new APIError(res_error.message, res_error.code);
  }
}

export async function verifyOTPForgetPassword(
  payload: VerifyOTPPayload,
): Promise<Response> {
  try {
    const response = await httpWrapper.POST(
      false,
      'api/user/reset-password/verify-otp',
      payload,
    );
    return responseHandler(response);
  } catch (error: unknown) {
    const res_error = responseErrorHandler(error);
    throw new APIError(res_error.message, res_error.code);
  }
}

export async function login(credentails: LoginValues): Promise<Response> {
  try {
    const response = await httpWrapper.POST(
      false,
      'api/user/login',
      credentails,
    );
    return responseHandler(response);
  } catch (error: unknown) {
    const res_error = responseErrorHandler(error) as Response;
    throw new APIError(res_error.message, res_error.code);
  }
}

interface ResetPasswordPayload {
  otp: number;
  email: string;
  newPassword: string;
}

export async function resetPassword(
  payload: ResetPasswordPayload,
): Promise<Response> {
  try {
    const response = await httpWrapper.POST(false, 'api/user/rest-password', {
      otp: payload.otp,
      email: payload.email,
      newPassword: payload.newPassword,
    });
    return responseHandler(response);
  } catch (error) {
    const res_error = responseErrorHandler(error) as Response;
    throw new APIError(res_error.message, res_error.code);
  }
}
