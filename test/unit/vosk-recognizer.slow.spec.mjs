import { expect } from "chai";

import { VoskModel } from "../../src/vosk-wrapper/vosk-model.mjs";
import { VoskRecognizer } from "../../src/vosk-wrapper/vosk-recognizer.mjs";
import { MODEL_PATH, TEST_AUDIO_FILE, TEST_AUDIO_TEXT } from "./consts.mjs";

describe(VoskRecognizer.name, function () {
  this.timeout(5000);

  let voskModel;
  before(function () {
    voskModel = new VoskModel(MODEL_PATH);
  });

  after(function () {
    voskModel.free();
  });

  describe(VoskRecognizer.prototype.free.name, function () {
    it("frees the recognizer", function () {
      const recognizer = voskModel.createRecognizer();
      recognizer.free();
      expect(() => recognizer.reset()).to.throw();
    });

    it("allows repeated calls to free", function () {
      const recognizer = voskModel.createRecognizer();
      recognizer.free();
      expect(() => recognizer.free()).to.not.throw();
    });
  });

  describe(`${VoskRecognizer.prototype.acceptWaveform.name}`, function () {
    it("should accept and process a WAV file, and allow multiple calls to accumulate audio data", async function () {
      const recognizer = voskModel.createRecognizer();
      await recognizer.acceptWaveform(TEST_AUDIO_FILE);
      await recognizer.acceptWaveform(TEST_AUDIO_FILE);
      const result = recognizer.getFinalResult();
      expect(result.text.startsWith(TEST_AUDIO_TEXT)).to.be.true;
      expect(result.text.length).to.be.greaterThan(TEST_AUDIO_TEXT.length);
      recognizer.free();
    });
  });

  describe(VoskRecognizer.prototype.getFinalResult.name, function () {
    it("should retrieve the completed utterance and reset the recognizer", async function () {
      const recognizer = voskModel.createRecognizer();
      await recognizer.acceptWaveform(TEST_AUDIO_FILE);
      expect((recognizer.getFinalResult()).text).to.be.equal(TEST_AUDIO_TEXT);
      await recognizer.acceptWaveform(TEST_AUDIO_FILE);
      expect((recognizer.getFinalResult()).text).to.be.equal(TEST_AUDIO_TEXT);
      recognizer.free();
    });
  });

  describe(VoskRecognizer.prototype.getPartialResult.name, function () {
    it("should retrieve the completed utterance without consuming it or altering the recognizer state", async function () {
      const recognizer = voskModel.createRecognizer();
      await recognizer.acceptWaveform(TEST_AUDIO_FILE);
      expect((recognizer.getPartialResult()).partial).not.to.be.equal("");
      expect((recognizer.getFinalResult()).text).to.be.equal(TEST_AUDIO_TEXT);
      recognizer.free();
    });

    it("should not guarantee the partial result matches the final result", async function () {
      const recognizer = voskModel.createRecognizer();
      await recognizer.acceptWaveform(TEST_AUDIO_FILE);
      expect((recognizer.getPartialResult()).partial).not.to.be.equal(TEST_AUDIO_TEXT);
      expect((recognizer.getFinalResult()).text).to.be.equal(TEST_AUDIO_TEXT);
      recognizer.free();
    });
  });

  describe(VoskRecognizer.prototype.getResult.name, function () {
    it("should retrieve and consume the completed utterance without altering the recognizer state", async function () {
      const recognizer = voskModel.createRecognizer();
      await recognizer.acceptWaveform(TEST_AUDIO_FILE);
      expect((recognizer.getResult()).text).to.be.equal(TEST_AUDIO_TEXT);
      expect((recognizer.getResult()).text).to.be.equal("");
      await recognizer.acceptWaveform(TEST_AUDIO_FILE);
      expect((recognizer.getResult()).text).not.to.be.equal(TEST_AUDIO_TEXT);
      expect((recognizer.getFinalResult()).text).to.be.equal("");
      recognizer.free();
    });
  });

  describe(VoskRecognizer.prototype.reset.name, function () {
    it("resets the recognizer state", async function () {
      const recognizer = voskModel.createRecognizer();
      await recognizer.acceptWaveform(TEST_AUDIO_FILE);
      const result1 = recognizer.getFinalResult();
      expect(result1.text).to.be.equal(TEST_AUDIO_TEXT);
      recognizer.reset();
      const result2 = recognizer.getFinalResult();
      expect(result2.text).to.be.equal("");
    });
  });
});
