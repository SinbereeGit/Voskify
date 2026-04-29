<div align="center">

# Voskify

![npm version](https://img.shields.io/npm/v/voskify)

</div>

A Node.js wrapper for Vosk via koffi.

## ✨ Features

- 🚀 **Zero compilation** – No `node-gyp` hassle.
- 📡 **Fully offline** – All speech recognition runs locally, no network required.
- 🎙️ **WAV in, text out** – Accepts standard `.wav` files and returns recognized text in a few lines of code.

## 📦 Installation

```bash
npm install voskify
```

## 🚀 Quick Start

Download a Vosk model (e.g. `vosk-model-small-en-us-0.15`) from the [Vosk models page](https://alphacephei.com/vosk/models) and place it in a local `models` directory. Then use the following code to transcribe a WAV file:

```js
import { VoskModel } from "voskify";

const model = new VoskModel("./models/vosk-model-small-en-us-0.15");
const recognizer = model.createRecognizer();

await recognizer.acceptWaveform("./audio/sample.wav");

console.log(recognizer.getFinalResult());

model.free();
```

## 🧱 Limitations

- Only Windows is supported.

## 🙏 Acknowledgements

Thanks to the following open-source projects:

- [vosk-api](https://github.com/alphacep/vosk-api)
- [koffi](https://github.com/Koromix/koffi)
- [wavefile](https://github.com/rochars/wavefile)

## License

[MIT](https://github.com/SinbereeGit/voskify/tree/main/LICENSE)
