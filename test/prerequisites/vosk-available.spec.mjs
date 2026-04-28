import { expect } from "chai";
import { VoskFunctions } from "../../src/vosk-wrapper/vosk-functions.mjs";

describe("Vosk availability", function () {
  it("should load Vosk successfully", function () {
    VoskFunctions.assertExistence();
  });
});
