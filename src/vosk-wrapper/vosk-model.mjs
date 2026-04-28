import { VoskFunctions } from "./vosk-functions.mjs";
import { VoskRecognizer } from "./vosk-recognizer.mjs";

export class VoskModel {
  constructor(modelPath) {
    this.model = VoskFunctions.vosk_model_new(modelPath);
    this.recognizers = [];
  }

  /**
   * Allow repeated calls to free, but do nothing if already freed.
   */
  free() {
    if (!this.model) return;

    this.recognizers.forEach((recognizer) => recognizer.free());
    this.recognizers = [];
    VoskFunctions.vosk_model_free(this.model);
    this.model = null;
  }

  createRecognizer() {
    if (!this.model)
      throw new Error("Model is not initialized or has already been freed.");

    const recognizer = new VoskRecognizer(this.model);
    this.recognizers.push(recognizer);
    return recognizer;
  }
}
