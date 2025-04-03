import { httpWrapper, responseErrorHandler, responseHandler } from '@/utils';
import { Response } from '../axiosConfig';
import { APIError } from '@/utils/Exception';

export async function popularMovies(): Promise<Response> {
  try {
    const response = await httpWrapper.GET(true, 'api/shows/popular-movies');
    return responseHandler(response);
  } catch (error: unknown) {
    const res_error = responseErrorHandler(error);
    throw new APIError(res_error.message, res_error.code);
  }
}

interface FetchDataByGenrePayload {
  genres: string;
  lang: string;
  type: string;
}

export async function fetchDataByGenre(
  payload: FetchDataByGenrePayload,
): Promise<Response> {
  try {
    const response = await httpWrapper.GET(
      true,
      `api/shows/search?genres=${payload.genres}&language=${payload.lang}&type=${payload.type}`,
    );
    return responseHandler(response);
  } catch (error: unknown) {
    const res_error = responseErrorHandler(error);
    throw new APIError(res_error.message, res_error.code);
  }
}

export async function SearchMovie(query: string): Promise<Response> {
  try {
    const response = await httpWrapper.GET(
      true,
      `api/shows/auto-complete?q=${query}`,
    );
    return responseHandler(response);
  } catch (error: unknown) {
    const res_error = responseErrorHandler(error);
    throw new APIError(res_error.message, res_error.code);
  }
}
