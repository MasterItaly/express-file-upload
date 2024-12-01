import { CustomLogger } from "../custom.logger";

/** * Helper - Content */
export class ContentHelper {
  private readonly logger: CustomLogger = new CustomLogger(ContentHelper.name);
  
  constructor() {}
  
  /**
   * * Generate Image Box
   * @param images
   */
  genImageBox(images: string[]): string {
    const items = images.map((image) => this.genImageBoxItem(image)).join('');
    return `<div class="image-list">${items}</div>`;
  }

  /**
   * * Generate Image Box Item
   * @param image
   */
  private genImageBoxItem(image: string): string {
    return `<div class="item"><img src="/uploads/${image}" alt="${image}" /></div>`;
  }
}