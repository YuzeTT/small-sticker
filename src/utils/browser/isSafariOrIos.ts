import getUserAgent from "./getUserAgent";

export default function isSafariOrIos() {
  const userAgent = getUserAgent();
  return userAgent?.name === "safari" || userAgent?.os === "iOS";
}