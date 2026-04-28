import { VoskFunctions } from "./vosk-functions.mjs";

export const VOSK_LOG_LEVEL = {
  SILENT: -1,
  INFO: 0,
  WARN: 1,
  DEBUG: 2,
  TRACE: 3,
};

export const VoskConfig = {
  /**
   * This is a fake function, because we have set the log level to {@link VOSK_LOG_LEVEL.SILENT} by default and it can not be changed.
   */
  setLogLevel: (level) => VoskFunctions.vosk_set_log_level(level),
};
