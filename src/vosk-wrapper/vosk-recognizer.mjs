import { readFile } from "node:fs/promises";

import wavefile from "wavefile";

import { VoskFunctions } from "./vosk-functions.mjs";

const VOSK_SAMPLE_RATE = 16000;

async function loadWavFile(wavFilePath) {
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

  return audioData;
}

export class VoskRecognizer {
  constructor(model) {
    this.recognizer = VoskFunctions.vosk_recognizer_new(
      model,
      VOSK_SAMPLE_RATE,
    );
  }

  /**
   * Allow repeated calls to free, but do nothing if already freed.
   */
  free() {
    if (!this.recognizer) return;

    VoskFunctions.vosk_recognizer_free(this.recognizer);
    this.recognizer = null;
  }

  reset() {
    if (!this.recognizer)
      throw new Error(
        "Recognizer is not initialized or has already been freed.",
      );

    VoskFunctions.vosk_recognizer_reset(this.recognizer);
  }

  async acceptWaveform(wavFilePath) {
    if (!this.recognizer)
      throw new Error(
        "Recognizer is not initialized or has already been freed.",
      );

    const monoAudioData = await loadWavFile(wavFilePath);
    const pcmBuffer = Buffer.from(monoAudioData.buffer);

    return VoskFunctions.vosk_recognizer_accept_waveform(
      this.recognizer,
      pcmBuffer,
      pcmBuffer.length,
    );
  }

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
