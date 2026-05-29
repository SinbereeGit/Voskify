# Voskify

![npm version](https://img.shields.io/npm/v/voskify)

A Node.js wrapper for Vosk via koffi.

## Features

- **Zero compilation** – No `node-gyp` hassle.
- **Fully offline** – All speech recognition runs locally, no network required.
- **WAV in, text out** – Accepts standard `.wav` files and returns recognized text in a few lines of code.

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

await recognizer.acceptWaveform("./audio/sample.wav");

console.log(recognizer.getFinalResult());

model.free();
```

## Supported Platforms

- Windows x64
- Linux x64
- macOS (untested, but should work)

## Postinstall

This package bundles pre-built Vosk binaries for Windows, macOS, and Linux.

After installation, it automatically keeps only the binary for your current platform and removes the other two. This saves about 37-92MB of disk space — you don't need to do anything.

> If you prefer to skip this cleanup (e.g., in CI environments), install with `--ignore-scripts`. The package will still work normally; the only difference is that all three platform binaries will remain on disk, resulting in larger disk usage. You can also delete the unnecessary folders manually under `node_modules/voskify/vosk-lib/` — the result is the same.

## Acknowledgements

Thanks to the following open-source projects:

- [vosk-api](https://github.com/alphacep/vosk-api)
- [koffi](https://github.com/Koromix/koffi)
- [wavefile](https://github.com/rochars/wavefile)

## License

[MIT](https://github.com/SinbereeGit/voskify/tree/main/LICENSE)
