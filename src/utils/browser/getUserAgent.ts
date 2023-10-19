import {
  type BotInfo,
  type BrowserInfo,
  parseUserAgent,
  type SearchBotDeviceInfo,
} from "detect-browser";

const { SSR } = import.meta.env;

let userAgent: Readonly<BrowserInfo | SearchBotDeviceInfo | BotInfo | null> =
  null;

export default function getUserAgent() {
  if (SSR) {
    return null;
  }

  if (!userAgent) {
    userAgent = Object.freeze(parseUserAgent(navigator.userAgent));
  }
  return userAgent;
}