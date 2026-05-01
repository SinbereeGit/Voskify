# Changelog

## 0.1.0

### Minor Changes

- e8d0a51: Extend `acceptWaveform` to support raw PCM Buffer input in addition to WAV files

### Patch Changes

- 13b82d7: Optimize package contents by excluding unnecessary files from npm publish

## 0.0.1 - 2026-04-29

### Major Changes

- Initial release of `voskify`.
- Offline speech recognition powered by Vosk, bound via `koffi` — no compilation required.
- Recognize speech from WAV files, with automatic resampling to 16kHz and stereo-to-mono mixing.
- Support three ways of retrieving recognition results:
  - Retrieve the completed utterance without consuming it or altering the recognizer state
  - Retrieve and consume the completed utterance without altering the recognizer state
  - Retrieve the completed utterance and reset the recognizer
- Configurable vosk log levels.
- Support only Windows currently.
