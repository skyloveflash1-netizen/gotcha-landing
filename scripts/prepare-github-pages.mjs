import { readdir, readFile, rename, stat, writeFile } from "node:fs/promises";
import path from "node:path";

const outputDirectory = path.resolve("dist/client");
const nextDirectory = path.join(outputDirectory, "_next");
const assetsDirectory = path.join(outputDirectory, "assets");

const textExtensions = new Set([
  ".css",
  ".html",
  ".js",
  ".json",
  ".map",
  ".rsc",
  ".txt",
]);

async function rewriteAssetReferences(directory) {
  for (const entry of await readdir(directory, { withFileTypes: true })) {
    const filePath = path.join(directory, entry.name);

    if (entry.isDirectory()) {
      await rewriteAssetReferences(filePath);
      continue;
    }

    if (!textExtensions.has(path.extname(entry.name)) && entry.name !== "_headers") {
      continue;
    }

    const source = await readFile(filePath, "utf8");
    const updated = source
      .replaceAll("/gotcha-landing/_next/", "/assets/")
      .replaceAll("/_next/", "/assets/")
      .replaceAll("_next/", "assets/");

    if (updated !== source) {
      await writeFile(filePath, updated);
    }
  }
}

try {
  if (!(await stat(nextDirectory)).isDirectory()) {
    throw new Error("dist/client/_next is not a directory");
  }
} catch (error) {
  throw new Error("GitHub Pages preparation requires a completed static build.", {
    cause: error,
  });
}

await rewriteAssetReferences(outputDirectory);
await rename(nextDirectory, assetsDirectory);

console.log("Prepared dist/client for GitHub Pages.");
