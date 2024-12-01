import fs from 'fs';
import os, { NetworkInterfaceInfo } from 'os';
import path from 'path';
import { CustomLogger } from '../custom.logger';

/** * Helper - System */
export class SystemHelper {
  private readonly logger: CustomLogger = new CustomLogger(SystemHelper.name);
  uploadFolder = path.join(__dirname, '..', '..', 'uploads');

  constructor() { }

  /** * Get IP-Address */
  getIpAddress(): string {
    const defaultAddress = 'localhost';
    try {
      const ifaces = os.networkInterfaces();
      let ipAddress: string | undefined;

      Object.keys(ifaces).forEach((ifname) => {
        ifaces[ifname]?.forEach((iface: NetworkInterfaceInfo) => {
          if ('IPv4' === iface.family && !iface.internal) {
            ipAddress = iface.address;
          }
        });
      });

      return ipAddress || defaultAddress;
    } catch (error) {
      this.logger.error(`Error in ${this.getIpAddress.name}!`, error);
      return defaultAddress;
    }
  }

  /**
   * * Get Files
   * @param path
   */
  getFiles(path: string): string[] {
    let list: string[] = [];
    try {
      this.logger.debug(`Path: ${path}`);
      if (fs.existsSync(path)) {
        list = fs.readdirSync(path);
      } else {
        this.logger.warn('Path does not exist!');
      }
      return list;
    } catch (error) {
      this.logger.error(`Error in ${this.getFiles.name}!`, error);
      return list;
    }
  }
}
