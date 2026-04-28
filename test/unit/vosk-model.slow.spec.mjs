import { expect } from "chai";

import { VoskModel } from "../../src/vosk-wrapper/vosk-model.mjs";
import { VoskRecognizer } from "../../src/vosk-wrapper/vosk-recognizer.mjs";
import { MODEL_PATH } from "./consts.mjs";

describe(`${VoskModel.name}`, function () {
  describe(VoskModel.prototype.createRecognizer.name, function () {
    it(`creates an instance of ${VoskRecognizer.name}`, function () {
      const voskModel = new VoskModel(MODEL_PATH);
      expect(voskModel.createRecognizer()).to.be.instanceOf(VoskRecognizer);
      voskModel.free();
    });

    it("throws when model is freed", function () {
      const voskModel = new VoskModel(MODEL_PATH);
      voskModel.free();
      expect(() => voskModel.createRecognizer()).to.throw();
    });
  });

  describe(VoskModel.prototype.free.name, function () {
    it("frees the model and its recognizers", function () {
      const voskModel = new VoskModel(MODEL_PATH);
      const recognizer1 = voskModel.createRecognizer();
      const recognizer2 = voskModel.createRecognizer();
      voskModel.free();

      expect(() => voskModel.createRecognizer()).to.throw();
      expect(() => recognizer1.reset()).to.throw();
      expect(() => recognizer2.reset()).to.throw();
    });

    it("allows repeated calls to free", function () {
      const voskModel = new VoskModel(MODEL_PATH);
      voskModel.free();
      expect(() => voskModel.free()).to.not.throw();
    });
  });
});
