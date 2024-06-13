import fetch from "node-fetch";
import fs from "fs";
import path from "path";
import { pipeline } from "stream";
import { promisify } from "util";
import unzipper from "unzipper";

const repoUrl =
  "https://git.deutsche-glasfaser.de/apis/x-program/-/archive/master/x-program-master.zip";
const outputDirectory = "./contracts";

const streamPipeline = promisify(pipeline);

// Function to remove the directory using fs.rm with recursive option
async function cleanDirectory(path) {
  try {
    // Check if directory exists
    if (fs.existsSync(path)) {
      await fs.promises.rm(path, { recursive: true, force: true });
      console.log(`Successfully removed the directory: ${path}`);
    } else {
      console.log(`No directory to remove at: ${path}`);
    }
  } catch (error) {
    console.error(`Error removing directory: ${error}`);
  }
}

async function downloadAndExtract(url, outputDir) {
  // First, clean the output directory
  await cleanDirectory(outputDir);
  // Then, recreate the directory
  await fs.promises.mkdir(outputDir, { recursive: true });

  const response = await fetch(url);
  if (!response.ok)
    throw new Error(`Failed to download: ${response.statusText}`);

  await streamPipeline(
    response.body,
    unzipper.Parse().on("entry", function (entry) {
      const fileName = entry.path;
      const type = entry.type; // 'Directory' or 'File'
      const fullPath = path.join(outputDir, fileName.replace(/^[^\/]+\//, "")); // Strip the first directory segment

      if (type === "File") {
        entry.pipe(fs.createWriteStream(fullPath));
      } else {
        // If it's a directory, ensure it's created
        fs.promises.mkdir(fullPath, { recursive: true }).then(() => {
          entry.autodrain(); // Automatically drain any data from the entry
        });
      }
    })
  );
}

downloadAndExtract(repoUrl, outputDirectory)
  .then(() => console.log("Repository downloaded and extracted successfully."))
  .catch((err) => console.error("An error occurred:", err));
