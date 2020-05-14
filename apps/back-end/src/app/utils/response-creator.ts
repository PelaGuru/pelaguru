import { ServerResponse } from '@pelaguru/interfaces';

export function makeResponse(
  success: boolean,
  message: string = 'success',
  statusCode: number = 200,
  data?: any
): ServerResponse {
  return { success, message, data, statusCode };
}
