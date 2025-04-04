export const HTTP_MESSAGES: Record<number, string> = {
  // 2xx Success
  200: 'OK',
  201: 'Created',
  204: 'No Content',

  // 3xx Redirection
  301: 'Moved Permanently',
  302: 'Found',
  304: 'Not Modified',

  // 4xx Client Errors
  400: 'Bad Request',
  401: 'Unauthorized',
  403: 'Forbidden',
  404: 'Not Found',
  405: 'Method Not Allowed',
  408: 'Request Timeout',
  409: 'Conflict',
  410: 'Gone',
  429: 'Too Many Requests',

  // 5xx Server Errors
  500: 'Internal Server Error',
  501: 'Not Implemented',
  502: 'Bad Gateway',
  503: 'Service Unavailable',
  504: 'Gateway Timeout',
};

export function GetHttpMessage(statusCode: number): string {
  return HTTP_MESSAGES[statusCode] || "Unknown Error";
}
