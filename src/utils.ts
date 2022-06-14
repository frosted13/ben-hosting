import crypto from "crypto";

export function generateRandomKey() {
  return crypto.randomBytes(32).toString("hex");
}
