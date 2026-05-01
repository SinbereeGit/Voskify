import { readFile } from "node:fs/promises";

import wavefile from "wavefile";

import { VoskFunctions } from "./vosk-functions.mjs";

const VOSK_SAMPLE_RATE = 16000;

export async function loadWavFile(wavFilePath) {
  const wavBuffer = await readFile(wavFilePath);
  const wav = new wavefile.WaveFile(wavBuffer);

  if (wav.fmt.sampleRate !== VOSK_SAMPLE_RATE) {
    wav.toSampleRate(VOSK_SAMPLE_RATE);
  }

  const audioData = wav.getSamples(false, Int16Array);

  if (Array.isArray(audioData)) {
    if (audioData.length > 1) {
      const SCALING_FACTOR = Math.sqrt(2);

      // Merge channels (into first channel to save memory)
      for (let i = 0; i < audioData[0].length; ++i) {
        audioData[0][i] =
          (SCALING_FACTOR * (audioData[0][i] + audioData[1][i])) / 2;
      }
    }

    // Select first channel
    return audioData[0];
  }

  return Buffer.from(
    audioData.buffer,
    audioData.byteOffset,
    audioData.byteLength,
  );
}

export class VoskRecognizer {
  constructor(model) {
    this.recognizer = VoskFunctions.vosk_recognizer_new(
      model,
      VOSK_SAMPLE_RATE,
    );
  }

  /**
   * Allow repeated calls to free, but do nothing if already freed
   */
  free() {
    if (!this.recognizer) return;

    VoskFunctions.vosk_recognizer_free(this.recognizer);
    this.recognizer = null;
  }

  /**
   * Resets the recognizer state
   */
  reset() {
    if (!this.recognizer)
      throw new Error(
        "Recognizer is not initialized or has already been freed.",
      );

    VoskFunctions.vosk_recognizer_reset(this.recognizer);
  }

  /**
   * Accept and process a WAV file or a Buffer containing PCM data, and allow multiple calls to accumulate audio data
   *
   * **Note: if using a Buffer, it must contain raw PCM data, and the sample rate must be 16000 Hz, mono, and 16-bit.**
   */
  async acceptWaveform(wavFilePathOrBuffer) {
    if (!this.recognizer)
      throw new Error(
        "Recognizer is not initialized or has already been freed.",
      );

    let pcmBuffer;
    if (Buffer.isBuffer(wavFilePathOrBuffer)) {
      pcmBuffer = wavFilePathOrBuffer;
    } else if (typeof wavFilePathOrBuffer === "string") {
      pcmBuffer = await loadWavFile(wavFilePathOrBuffer);
    } else {
      throw new Error(
        "Invalid input: expected a file path string or a Buffer containing PCM data.",
      );
    }

    return VoskFunctions.vosk_recognizer_accept_waveform(
      this.recognizer,
      pcmBuffer,
      pcmBuffer.length,
    );
  }

  /**
   * Retrieve the completed utterance without consuming it or altering the recognizer state
   */
  getPartialResult() {
    if (!this.recognizer)
      throw new Error(
        "Recognizer is not initialized or has already been freed.",
      );

    return JSON.parse(
      VoskFunctions.vosk_recognizer_partial_result(this.recognizer),
    );
  }

  /**
   * Retrieve and consume the completed utterance without altering the recognizer state
   */
  getResult() {
    if (!this.recognizer)
      throw new Error(
        "Recognizer is not initialized or has already been freed.",
      );

    return JSON.parse(VoskFunctions.vosk_recognizer_result(this.recognizer));
  }

  /**
   * Retrieve the completed utterance and reset the recognizer
   */
  getFinalResult() {
    if (!this.recognizer)
      throw new Error(
        "Recognizer is not initialized or has already been freed.",
      );

    return JSON.parse(
      VoskFunctions.vosk_recognizer_final_result(this.recognizer),
    );
  }
}
