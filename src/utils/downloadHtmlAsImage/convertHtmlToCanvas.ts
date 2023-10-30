import { toCanvas } from "html-to-image";

export default async function convertHtmlToCanvas(
  targetElement: HTMLElement,
  countReRender: number = 0,
  timeout: number = 1,
  pixel: number|undefined = undefined,
): Promise<HTMLCanvasElement> {
  const canvas = await toCanvas(targetElement,{ skipAutoScale: true, pixelRatio: pixel});
  await new Promise((resolve) => setTimeout(resolve, timeout));

  if (countReRender > 0) {
    return convertHtmlToCanvas(targetElement, countReRender - 1, timeout, pixel);
  }
  return canvas;
}