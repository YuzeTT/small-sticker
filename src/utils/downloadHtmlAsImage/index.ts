import download from "downloadjs";
import isSafariOrIos from "../browser/isSafariOrIos";
import convertHtmlToCanvas from "./convertHtmlToCanvas";
import getJpegDataUrl from "./getJpegDataUrl";
import getPngDataUrl from "./getPngDataUrl";

export default async function downloadHtmlAsImage(
  targetElement: HTMLElement,
  type: "JPEG" | "PNG",
  fileName: string,
  hasImages = false,
  pixel: number = 1
) {
  const canvas =
    hasImages && isSafariOrIos()
      ? await convertHtmlToCanvas(targetElement, 10, 150, pixel) // safari loves pain
      : await convertHtmlToCanvas(targetElement, 0, 1, pixel);

  switch (type) {
    case "PNG":
      return download(getPngDataUrl(canvas), `${fileName}.png`);
    case "JPEG":
      return download(getJpegDataUrl(canvas), `${fileName}.jpeg`);
  }
}