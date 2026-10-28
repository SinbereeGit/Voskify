import path from "path";
import { fileURLToPath } from "url";
import os from "os";
import fs from "fs";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

if (!__dirname.includes("node_modules")) {
  process.exit(0);
}

const platform = os.platform();

let reservedLibDirName;

switch (platform) {
  case "win32":
    reservedLibDirName = "vosk-win64-0.3.45";
    break;
  case "darwin":
    reservedLibDirName = "vosk-osx-0.3.42";
    break;
  case "linux":
    reservedLibDirName = "vosk-linux-x86_64-0.3.45";
    break;
  default:
    throw new Error(`Unsupported platform: ${platform}`);
}

const voskLibRoot = path.join(__dirname, "..", "vosk-lib");

fs.readdirSync(voskLibRoot).forEach((itemDirName) => {
  if (itemDirName !== reservedLibDirName) {
    fs.rmSync(path.join(voskLibRoot, itemDirName), {
      recursive: true,
      force: true,
    });
  }
});
