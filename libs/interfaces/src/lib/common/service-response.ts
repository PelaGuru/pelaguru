export class ServiceResponse {
  constructor(
    public success: boolean,
    public message: string,
    public error: any,
    public data: any
  ) {}
}
