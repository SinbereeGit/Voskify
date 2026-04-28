import { VoskFunctions } from "./vosk-functions.mjs";

export const VOSK_LOG_LEVEL = {
  SILENT: -1,
  INFO: 0,
  WARN: 1,
  DEBUG: 2,
  TRACE: 3,
};

export const VoskConfig = {
  setLogLevel: (level) => VoskFunctions.vosk_set_log_level(level),
};
