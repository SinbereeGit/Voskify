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

// The vosk C API functions are in the same order as in the `vosk_api.h` header file of `vosk-win64-0.3.45`
export const VoskFunctions = {
  assertExistence() {
    if (!voskLib) {
      throw new Error("Failed to load Vosk library");
    }
  },

  /**
   * `(const char *model_path) => void *`
   */
  vosk_model_new: voskLib.func("vosk_model_new", "void *", ["const char *"]),

  /**
   * `(void *model) => void`
   */
  vosk_model_free: voskLib.func("vosk_model_free", "void", ["void *"]),

  /**
   * `(void *model, const char *word) => int`
   */
  vosk_model_find_word: voskLib.func("vosk_model_find_word", "int", [
    "void *",
    "const char *",
  ]),

  /**
   * `(const char *model_path) => void *`
   */
  vosk_spk_model_new: voskLib.func("vosk_spk_model_new", "void *", [
    "const char *",
  ]),

  /**
   * `(void *model) => void`
   */
  vosk_spk_model_free: voskLib.func("vosk_spk_model_free", "void", ["void *"]),

  /**
   * `(void *model, float sample_rate) => void *`
   */
  vosk_recognizer_new: voskLib.func("vosk_recognizer_new", "void *", [
    "void *",
    "float",
  ]),

  /**
   * `(void *model, float sample_rate, void *spk_model) => void *`
   */
  vosk_recognizer_new_spk: voskLib.func("vosk_recognizer_new_spk", "void *", [
    "void *",
    "float",
    "void *",
  ]),

  /**
   * `(void *model, float sample_rate, const char *grammar) => void *`
   */
  vosk_recognizer_new_grm: voskLib.func("vosk_recognizer_new_grm", "void *", [
    "void *",
    "float",
    "const char *",
  ]),

  /**
   * `(void *recognizer, void *spk_model) => void`
   */
  vosk_recognizer_set_spk_model: voskLib.func(
    "vosk_recognizer_set_spk_model",
    "void",
    ["void *", "void *"],
  ),

  /**
   * `(void *recognizer, const char *grammar) => void`
   */
  vosk_recognizer_set_grm: voskLib.func("vosk_recognizer_set_grm", "void", [
    "void *",
    "const char *",
  ]),

  /**
   * `(void *recognizer, int max_alternatives) => void`
   */
  vosk_recognizer_set_max_alternatives: voskLib.func(
    "vosk_recognizer_set_max_alternatives",
    "void",
    ["void *", "int"],
  ),

  /**
   * `(void *recognizer, int words) => void`
   */
  vosk_recognizer_set_words: voskLib.func("vosk_recognizer_set_words", "void", [
    "void *",
    "int",
  ]),

  /**
   * `(void *recognizer, int partial_words) => void`
   */
  vosk_recognizer_set_partial_words: voskLib.func(
    "vosk_recognizer_set_partial_words",
    "void",
    ["void *", "int"],
  ),

  /**
   * `(void *recognizer, int nlsml) => void`
   */
  vosk_recognizer_set_nlsml: voskLib.func("vosk_recognizer_set_nlsml", "void", [
    "void *",
    "int",
  ]),

  /**
   * `(void *recognizer, const char *data, int length) => int`
   */
  vosk_recognizer_accept_waveform: voskLib.func(
    "vosk_recognizer_accept_waveform",
    "int",
    ["void *", "const char *", "int"],
  ),

  /**
   * `(void *recognizer, const short *data, int length) => int`
   */
  vosk_recognizer_accept_waveform_s: voskLib.func(
    "vosk_recognizer_accept_waveform_s",
    "int",
    ["void *", "const short *", "int"],
  ),

  /**
   * `(void *recognizer, const float *data, int length) => int`
   */
  vosk_recognizer_accept_waveform_f: voskLib.func(
    "vosk_recognizer_accept_waveform_f",
    "int",
    ["void *", "const float *", "int"],
  ),

  /**
   * `(void *recognizer) => const char *`
   */
  vosk_recognizer_result: voskLib.func(
    "vosk_recognizer_result",
    "const char *",
    ["void *"],
  ),

  /**
   * `(void *recognizer) => const char *`
   */
  vosk_recognizer_partial_result: voskLib.func(
    "vosk_recognizer_partial_result",
    "const char *",
    ["void *"],
  ),

  /**
   * `(void *recognizer) => const char *`
   */
  vosk_recognizer_final_result: voskLib.func(
    "vosk_recognizer_final_result",
    "const char *",
    ["void *"],
  ),

  /**
   * `(void *recognizer) => void`
   */
  vosk_recognizer_reset: voskLib.func("vosk_recognizer_reset", "void", [
    "void *",
  ]),

  /**
   * `(void *recognizer) => void`
   */
  vosk_recognizer_free: voskLib.func("vosk_recognizer_free", "void", [
    "void *",
  ]),

  /**
   * `(int log_level) => void`
   */
  vosk_set_log_level: voskLib.func("vosk_set_log_level", "void", ["int"]),

  /**
   * `() => void`
   */
  vosk_gpu_init: voskLib.func("vosk_gpu_init", "void", []),

  /**
   * `() => void`
   */
  vosk_gpu_thread_init: voskLib.func("vosk_gpu_thread_init", "void", []),

  /**
   * `(const char *model_path) => void *`
   */
  vosk_batch_model_new: voskLib.func("vosk_batch_model_new", "void *", [
    "const char *",
  ]),

  /**
   * `(void *model) => void`
   */
  vosk_batch_model_free: voskLib.func("vosk_batch_model_free", "void", [
    "void *",
  ]),

  /**
   * `(void *model) => void`
   */
  vosk_batch_model_wait: voskLib.func("vosk_batch_model_wait", "void", [
    "void *",
  ]),

  /**
   * `(void *model, float sample_rate) => void *`
   */
  vosk_batch_recognizer_new: voskLib.func(
    "vosk_batch_recognizer_new",
    "void *",
    ["void *", "float"],
  ),

  /**
   * `(void *recognizer) => void`
   */
  vosk_batch_recognizer_free: voskLib.func(
    "vosk_batch_recognizer_free",
    "void",
    ["void *"],
  ),

  /**
   * `(void *recognizer, const char *data, int length) => int`
   */
  vosk_batch_recognizer_accept_waveform: voskLib.func(
    "vosk_batch_recognizer_accept_waveform",
    "int",
    ["void *", "const char *", "int"],
  ),

  /**
   * `(void *recognizer, int nlsml) => void`
   */
  vosk_batch_recognizer_set_nlsml: voskLib.func(
    "vosk_batch_recognizer_set_nlsml",
    "void",
    ["void *", "int"],
  ),

  /**
   * `(void *recognizer) => void`
   */
  vosk_batch_recognizer_finish_stream: voskLib.func(
    "vosk_batch_recognizer_finish_stream",
    "void",
    ["void *"],
  ),

  /**
   * `(void *recognizer) => const char *`
   */
  vosk_batch_recognizer_front_result: voskLib.func(
    "vosk_batch_recognizer_front_result",
    "const char *",
    ["void *"],
  ),

  /**
   * `(void *recognizer) => void`
   */
  vosk_batch_recognizer_pop: voskLib.func("vosk_batch_recognizer_pop", "void", [
    "void *",
  ]),

  /**
   * `(void *recognizer) => int`
   */
  vosk_batch_recognizer_get_pending_chunks: voskLib.func(
    "vosk_batch_recognizer_get_pending_chunks",
    "int",
    ["void *"],
  ),
};

VoskFunctions.vosk_set_log_level(-1); // Disable logging by default
