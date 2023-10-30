import isSafariOrIos from "../browser/isSafariOrIos";
import convertHtmlToCanvas from "./convertHtmlToCanvas";
import getJpegDataUrl from "./getJpegDataUrl";
import getPngDataUrl from "./getPngDataUrl";

export default async function showImage(
  targetElement: HTMLElement,
  type: "JPEG" | "PNG",
  hasImages = false,
  pixel: number|undefined = undefined
) {
  const canvas =
    hasImages && isSafariOrIos()
      ? await convertHtmlToCanvas(targetElement, 10, 150, pixel) // safari loves pain
      : await convertHtmlToCanvas(targetElement, undefined, undefined, pixel);

  switch (type) {
    case "PNG":
      return getPngDataUrl(canvas)
    case "JPEG":
      return getJpegDataUrl(canvas)
  }
}