import { ServerResponse } from '@pelaguru/interfaces';

export function makeResponse(
  success: boolean,
  message: string = 'success',
  statusCode: number = 200,
  errorCode?: any,
  data?: any
): ServerResponse {
  return { success, message, errorCode, data, statusCode };
}
