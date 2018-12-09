import uuidv4 from "uuid/v4";
import { createCipheriv, createDecipheriv, randomBytes } from "crypto";
const ALGORITHM = "aes-256-ctr";
const SECRET = randomBytes(32);
const IV = Buffer(randomBytes(16));
// const IV = Buffer.alloc(16);

function encode(value) {
  const cipher = createCipheriv(ALGORITHM, SECRET, IV);
  let encoded = cipher.update(`${uuidv4()}_${value}`, "ascii", "base64");
  encoded += cipher.final("base64");

  return encoded;
}

function decode(value) {
  const decipher = createDecipheriv(ALGORITHM, SECRET, IV);
  let decoded = decipher.update(value, "base64", "ascii");
  decoded += decipher.final("ascii");
  const split = decoded.split("_");
  split.shift();

  return split.join("_");
}

export { encode, decode };
