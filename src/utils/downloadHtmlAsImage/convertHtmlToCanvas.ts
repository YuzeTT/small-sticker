import { toCanvas } from "html-to-image";

export default async function convertHtmlToCanvas(
  targetElement: HTMLElement,
  countReRender: number = 0,
  timeout: number = 1,
): Promise<HTMLCanvasElement> {
  const canvas = await toCanvas(targetElement);
  await new Promise((resolve) => setTimeout(resolve, timeout));

  if (countReRender > 0) {
    return convertHtmlToCanvas(targetElement, countReRender - 1, timeout);
  }
  return canvas;
}