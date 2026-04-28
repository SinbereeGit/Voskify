# Changelog

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
