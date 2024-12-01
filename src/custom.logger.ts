/** * Logger - Custom */
export class CustomLogger {
  private project: string;
  private isDebug: boolean = true;

  constructor(project: string) {
    this.project = `[${project}]`.padEnd(20, ' ');
  }

  /**
   * * Log
   * @param msg
   */
  log(msg: string): void {
    console.log(`🟡 | ${this.dateTimeString()} | ${this.project} | ${msg}`);
  }
  
  /**
   * * Information
   * @param msg
   */
  info(msg: string): void {
    console.info(`🔵 | ${this.dateTimeString()} | ${this.project} | ${msg}`);
  }
  
  /**
   * * Succsess
   * @param msg
   */
  succsess(msg: string): void {
    console.info(`🟢 | ${this.dateTimeString()} | ${this.project} | ${msg}`);
  }
  
  /**
   * * Debug
   * @param msg
   */
  debug(msg: string): void {
    if (this.isDebug) {
      console.log(`🟣 | ${this.dateTimeString()} | ${this.project} | ${msg}`);
    }
  }
  
  /**
   * * Warning
   * @param msg
   */
  warn(msg: string): void {
    console.warn(`🟠 | ${this.dateTimeString()} | ${this.project} | ${msg}`);
  }
  
  /**
   * * Error
   * @param msg
   * @param error
   */
  error(msg: string, error: any = undefined): void {
    console.error(`🔴 | ${this.dateTimeString()} | ${this.project} | ${msg}`);
    if (error) {
      console.groupCollapsed('⚪️ Error-Output');
      console.error(error);
      console.groupEnd();
    }
  }

  /** * DateTime String */
  private dateTimeString(): string {
    const date = new Date();
    const iso = date.toISOString();
    const dateTime = iso.replace('T', ' ').replace('Z', '');
    return dateTime;
  }
}