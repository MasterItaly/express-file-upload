import * as fs from 'fs';
import * as os from 'os';
import * as path from 'path';
import { CustomLogger } from '../custom.logger';

/**
 * Helper - System
 */
export class SystemHelper {
  private static readonly logger: CustomLogger = new CustomLogger(
    SystemHelper.name
  );

  /**
   * Directory - Root
   */
  public static readonly rootDirectory: string = path.join(process.cwd());

  /**
   * Directory - Upload
   */
  public static readonly uploadDirectory: string = path.join(
    SystemHelper.rootDirectory,
    'uploads'
  );

  /**
   * * Directory - Public
   */
  public static readonly publicDirectory: string = path.join(
    SystemHelper.rootDirectory,
    'public'
  );

  /**
   * * Directory - Views
   */
  public static readonly viewsDirectory: string = path.join(
    SystemHelper.rootDirectory,
    'views'
  );

  /**
   * * Get IP-Address
   * @returns
   */
  public static getIpAddress(): string {
    const defaultAddress = 'localhost';

    try {
      const ifaces = os.networkInterfaces();
      for (const ifname of Object.keys(ifaces)) {
        for (const iface of ifaces[ifname] ?? []) {
          if (iface.family === 'IPv4' && !iface.internal) {
            return iface.address;
          }
        }
      }
    } catch (error: any) {
      this.logger.error(`Error in getIpAddress!`, error);
    }

    return defaultAddress;
  }

  /**
   * * Get Files
   * @param dirPath
   * @returns
   */
  public static getFiles(dirPath: string): string[] {
    try {
      this.logger.debug(`Reading path: ${dirPath}`);
      return fs.readdirSync(dirPath);
    } catch (error: any) {
      this.logger.error(`Error in getFiles!`, error);
      return [];
    }
  }
}
