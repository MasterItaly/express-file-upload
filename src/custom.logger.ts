/**
 * * Logger - Custom
 */
export class CustomLogger {
  private readonly project: string;
  private readonly isDebug: boolean = true;

  public constructor(project: string) {
    this.project = `[${project}]`.padEnd(20, ' ');
  }

  /**
   * * Log
   * @param msg
   */
  public log(msg: string): void {
    console.log(`🟡 | ${this.dateTimeString()} | ${this.project} | ${msg}`);
  }

  /**
   * * Information
   * @param msg
   */
  public info(msg: string): void {
    console.info(`🔵 | ${this.dateTimeString()} | ${this.project} | ${msg}`);
  }

  /**
   * * Succsess
   * @param msg
   */
  public succsess(msg: string): void {
    console.info(`🟢 | ${this.dateTimeString()} | ${this.project} | ${msg}`);
  }

  /**
   * * Debug
   * @param msg
   */
  public debug(msg: string): void {
    if (this.isDebug) {
      console.log(`🟣 | ${this.dateTimeString()} | ${this.project} | ${msg}`);
    }
  }

  /**
   * * Warning
   * @param msg
   */
  public warn(msg: string): void {
    console.warn(`🟠 | ${this.dateTimeString()} | ${this.project} | ${msg}`);
  }

  /**
   * * Error
   * @param msg
   * @param error
   */
  public error(msg: string, error: any = undefined): void {
    console.error(`🔴 | ${this.dateTimeString()} | ${this.project} | ${msg}`);
    if (error) {
      console.groupCollapsed('⚪️ Error-Output');
      console.error(error);
      console.groupEnd();
    }
  }

  /**
   * * DateTime String
   * @returns
   */
  private dateTimeString(): string {
    const date = new Date();
    const iso: string = date.toISOString();
    const dateTime: string = iso.replace('T', ' ').replace('Z', '');
    return dateTime;
  }
}
