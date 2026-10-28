# Voskify

![npm version](https://img.shields.io/npm/v/voskify)

A Node.js wrapper for Vosk via koffi.

## Features

- **Zero compilation** – No `node-gyp` hassle.
- **Fully offline** – All speech recognition runs locally, no network required.
- **WAV in, text out** – Accepts standard `.wav` files and returns recognized text in a few lines of code.
- **Raw PCM support** – Feed in a `Buffer` of raw 16-bit, 16kHz, mono PCM data for full control over your audio pipeline.

## Installation

```bash
npm install voskify
```

## Quick Start

Download a Vosk model (e.g. `vosk-model-small-en-us-0.15`) from the [Vosk models page](https://alphacephei.com/vosk/models) and place it in a local `models` directory. Then use the following code to transcribe a WAV file:

```js
import { VoskModel } from "voskify";

const model = new VoskModel("./models/vosk-model-small-en-us-0.15");
const recognizer = model.createRecognizer();
// or create recogizer with grammar list, for example
// const recognizer = model.createRecognizer(["one two three", "[unk]"]);

await recognizer.acceptWaveform("./audio/sample.wav");

console.log(recognizer.getFinalResult());

model.free();
```

> For raw PCM input, see [Raw PCM Input Example](#raw-pcm-input-example) below.

## Raw PCM Input Example

If you already have raw 16kHz, 16-bit, mono PCM data in a `Buffer`, you can pass it to `recognizer.acceptWaveform()` directly.

As a detailed example, here we read a WAV file using the `wavefile` package (don't worry about it — it comes with `voskify` as a dependency), extract the raw PCM data, and feed it into the recognizer.

> **Note:** You don't actually need to do this for WAV files — `voskify` handles WAV parsing, resampling, and channel mixing for you. This example is here to show what valid raw PCM looks like so you can feed audio from other sources (microphone, network, etc.).

```js
import { readFile } from "node:fs/promises";

import { VoskModel } from "voskify";
import wavefile from "wavefile";

// Vosk models are trained on 16kHz audio — this is required
const VOSK_SAMPLE_RATE = 16000;

/**
 * Read a WAV file and convert it to raw 16-bit, 16kHz, mono PCM.
 *
 * This demonstrates what a valid raw PCM buffer looks like
 * if you want to feed audio from other sources (microphone, network, etc.).
 */
async function loadWavFile(wavFilePath) {
  const wavBuffer = await readFile(wavFilePath);
  const wav = new wavefile.WaveFile(wavBuffer);

  // Resample to 16kHz if the source file uses a different rate
  if (wav.fmt.sampleRate !== VOSK_SAMPLE_RATE) {
    wav.toSampleRate(VOSK_SAMPLE_RATE);
  }

  // Extract samples as 16-bit integers
  const audioData = wav.getSamples(false, Int16Array);

  if (Array.isArray(audioData)) {
    // Stereo or multi-channel — merge down to mono
    if (audioData.length > 1) {
      const SCALING_FACTOR = Math.sqrt(2);

      // Average the channels into the first channel to avoid clipping and save memory
      for (let i = 0; i < audioData[0].length; ++i) {
        audioData[0][i] =
          (SCALING_FACTOR * (audioData[0][i] + audioData[1][i])) / 2;
      }
    }

    // Use the first (now only) channel
    return audioData[0];
  }

  // Already mono — return as raw PCM buffer
  return Buffer.from(
    audioData.buffer,
    audioData.byteOffset,
    audioData.byteLength,
  );
}

// --- Usage ---
const model = new VoskModel("./models/vosk-model-small-en-us-0.15");
const recognizer = model.createRecognizer();

// Load a WAV file and extract raw PCM manually (for demonstration only)
const pcmBuffer  = await loadWavFile("./audio/sample.wav");

// Feed raw PCM data into the recognizer
await recognizer.acceptWaveform(pcmBuffer);

// Get the final transcription
console.log(recognizer.getFinalResult());

// Clean up
model.free();
```

## Supported Platforms

- Windows x64
- Linux x64
- macOS (untested, but should work)

## Postinstall

This package bundles pre-built Vosk binaries for Windows, macOS, and Linux.

After installation, it automatically keeps only the binary for your current platform and removes the other two. This saves a lot of disk space — you don't need to do anything.

> If you prefer to skip this cleanup (e.g., in CI environments), install with `--ignore-scripts`. The package will still work normally; the only difference is that all three platform binaries will remain on disk, resulting in larger disk usage. You can also delete the unnecessary folders manually under `node_modules/voskify/vosk-lib/` — the result is the same.

## Acknowledgements

Thanks to the following open-source projects:

- [vosk-api](https://github.com/alphacep/vosk-api)
- [koffi](https://github.com/Koromix/koffi)
- [wavefile](https://github.com/rochars/wavefile)

## License

[MIT](https://github.com/SinbereeGit/voskify/tree/main/LICENSE)
