const errorMessages: Record<number | 'network' | 'unknown', string> = {
  400: 'Bad Request',
  401: 'Unauthorized Access',
  403: 'Access Denied',
  404: 'Not Found',
  408: 'Request Timeout',
  500: 'Server Error',
  502: 'Bad Gateway',
  503: 'Service Unavailable',
  504: 'Gateway Timeout',
  network: 'No Internet Connection',
  unknown: 'Something Went Wrong',
};

export const getErrorMessage = (code: number | 'network' | 'unknown') => {
  return errorMessages[code];
};
