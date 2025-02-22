export class ErrorHandling extends Error {
  issue: string;
  statusCode: number;
  error_details?: Record<string, unknown>;
  constructor(
    message: string,
    issue: string,
    statusCode: number,
    eror_details?: Record<string, unknown>
  ) {
    super(message);
    this.issue = issue;
    this.statusCode = statusCode;
    this.error_details = eror_details;
    this.name = this.constructor.name;
  }
}
