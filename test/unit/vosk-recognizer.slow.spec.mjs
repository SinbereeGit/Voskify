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

  describe(`${VoskRecognizer.prototype.acceptWaveform.name} and ${VoskRecognizer.prototype.getFinalResult.name}`, function () {
    it("accepts audio in multiple chunks and gets the final result", async function () {
      const recognizer = voskModel.createRecognizer();
      await recognizer.acceptWaveform(TEST_AUDIO_FILE);
      await recognizer.acceptWaveform(TEST_AUDIO_FILE);
      const result = recognizer.getFinalResult();
      expect(result.text.startsWith(TEST_AUDIO_TEXT)).to.be.true;
      expect(result.text.length).to.be.greaterThan(TEST_AUDIO_TEXT.length);
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
