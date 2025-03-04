export class CustomError extends Error {
  public readonly statusCode: number;
  public readonly action: string;
  public readonly messages: string[];

  constructor(
    messages: string[],
    statusCode: number = 400,
    action: string = 'Unknown',
  ) {
    super(messages.join('; '));
    this.messages = messages;
    this.statusCode = statusCode;
    this.action = action;
    Object.setPrototypeOf(this, new.target.prototype);
  }
}
