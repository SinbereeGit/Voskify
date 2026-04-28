import path from "path";
import { fileURLToPath } from "url";

import koffi from "koffi";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const dllPath = path.join(
  __dirname,
  "..",
  "..",
  "vosk-lib",
  "vosk-win64-0.3.45",
  "libvosk.dll",
);
const voskLib = koffi.load(dllPath);

export const VoskFunctions = {
  assertExistence() {
    if (!voskLib) {
      throw new Error("Failed to load Vosk library");
    }
  },
  /**
   * `(int level) => void`
   */
  vosk_set_log_level: voskLib.func("vosk_set_log_level", "void", ["int"]),
  /**
   * `(char *model_path) => void *`
   */
  vosk_model_new: voskLib.func("vosk_model_new", "void *", ["const char *"]),
  /**
   * `(void *model) => void`
   */
  vosk_model_free: voskLib.func("vosk_model_free", "void", ["void *"]),
  /**
   * `(void *model, float sample_rate) => void *`
   */
  vosk_recognizer_new: voskLib.func("vosk_recognizer_new", "void *", [
    "void *",
    "float",
  ]),
  /**
   * `(void *recognizer) => void`
   */
  vosk_recognizer_free: voskLib.func("vosk_recognizer_free", "void", [
    "void *",
  ]),
  /**
   * `(void *recognizer) => void`
   */
  vosk_recognizer_reset: voskLib.func("vosk_recognizer_reset", "void", [
    "void *",
  ]),
  /**
   * `(void *recognizer, char *data, int len) => int`
   */
  vosk_recognizer_accept_waveform: voskLib.func(
    "vosk_recognizer_accept_waveform",
    "int",
    ["void *", "char *", "int"],
  ),
  /**
   * `(void *recognizer) => char *`
   */
  vosk_recognizer_final_result: voskLib.func(
    "vosk_recognizer_final_result",
    "const char *",
    ["void *"],
  ),
};

VoskFunctions.vosk_set_log_level(-1); // Disable logging by default
