const fs = require("fs/promises");
const path = require("path");

const EVIDENCE_DIRECTORY = path.join(__dirname, "..", "..", "evidence");
const CONTENT_TYPES = {
  "image/jpeg": ".jpg",
  "image/png": ".png",
  "image/webp": ".webp",
};

function safeFilePart(value) {
  return String(value || "inspection").replace(/[^a-zA-Z0-9_-]/g, "_");
}

async function storeEvidence(eventId, evidenceImage) {
  if (!evidenceImage || !evidenceImage.data) return null;

  const extension = CONTENT_TYPES[evidenceImage.content_type];
  if (!extension) throw new Error("Unsupported evidence image type");

  const image = Buffer.from(evidenceImage.data, "base64");
  if (!image.length || image.length > 10 * 1024 * 1024) {
    throw new Error("Evidence image must be between 1 byte and 10 MB");
  }

  await fs.mkdir(EVIDENCE_DIRECTORY, { recursive: true });
  const fileName = `${safeFilePart(eventId)}${extension}`;
  await fs.writeFile(path.join(EVIDENCE_DIRECTORY, fileName), image);
  return `/evidence/${fileName}`;
}

module.exports = { EVIDENCE_DIRECTORY, storeEvidence };
