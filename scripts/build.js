const fs = require("fs");
const path = require("path");
const yaml = require("yaml");
const ejs = require("ejs");

const inputDir = "./contracts";
const outputDir = "./build";
const ignoreDirs = new Set(["_base tmf", "_examples", "assets"]);

// EJS template for individual YAML files
const yamlTemplate = `
<!DOCTYPE html>
<html lang="en">
  <head>
    <meta charset="utf-8" />
    <meta
      name="viewport"
      content="width=device-width, initial-scale=1, shrink-to-fit=no"
    />
    <title><%= title %> - Version <%= version %></title>

    <script src="https://unpkg.com/@stoplight/elements/web-components.min.js"></script>
    <link
      rel="stylesheet"
      href="https://unpkg.com/@stoplight/elements/styles.min.css"
    />
  </head>
  <body>
    <elements-api
      apiDescriptionUrl="../../<%= yamlPath %>"
      router="hash"
    />
  </body>
</html>
`;

// Function to walk through the directory recursively
function walkDir(dir, callback) {
  fs.readdirSync(dir).forEach((f) => {
    let dirPath = path.join(dir, f);
    let isDirectory = fs.statSync(dirPath).isDirectory();
    if (isDirectory) {
      if (!ignoreDirs.has(f)) {
        walkDir(dirPath, callback);
      }
    } else {
      callback(path.join(dir), f);
    }
  });
}

// Read YAML and generate HTML
function processFile(dir, file) {
  if (path.extname(file) === ".yaml") {
    const filePath = path.join(dir, file);
    const content = fs.readFileSync(filePath, "utf8");
    const data = yaml.parse(content);
    const relativeDir = path.relative(inputDir, dir);
    const outputFilePath = path.join(
      outputDir,
      relativeDir,
      `${path.basename(file, ".yaml")}.html`
    );
    const yamlPath = path.join("_contracts", relativeDir, file);
    const htmlContent = ejs.render(yamlTemplate, {
      title: data.info.title,
      version: data.info.version,
      yamlPath,
    });
    fs.mkdirSync(path.dirname(outputFilePath), { recursive: true });
    fs.writeFileSync(outputFilePath, htmlContent);
    return {
      path: `./${relativeDir}/${path.basename(file, ".yaml")}.html`,
      title: data.info.title,
      version: data.info.version,
      dir: relativeDir,
    };
  }
}

// Generate overview HTML with recursive structure
function generateOverview(links) {
  let map = {};
  links.forEach((link) => {
    const parts = link.dir.split(path.sep);
    let current = map;
    parts.forEach((part) => {
      if (!current[part]) {
        current[part] = { _: {} };
      }
      current = current[part]._;
    });
    current[link.path] = `${link.title} - Version ${link.version}`;
  });

  const buildList = (obj) => {
    let content = "<ul>";
    for (let key in obj) {
      if (key === "_") {
        content += buildList(obj[key]);
      } else if (typeof obj[key] === "string") {
        content += `<li><a href="${key}">${obj[key]}</a></li>`;
      } else {
        content += `<li>${key}${buildList(obj[key])}</li>`;
      }
    }
    content += "</ul>";
    return content;
  };

  const overviewContent = `
  <html>
  <head><title>Overview</title></head>
  <body>
      <h1>Documentation Overview</h1>
      ${buildList(map)}
  </body>
  </html>
  `;

  fs.writeFileSync(path.join(outputDir, "index.html"), overviewContent);
}

// Function to copy the "contracts" directory to the "build" folder as "_contracts"
function copyContracts() {
  const src = inputDir;
  const dest = path.join(outputDir, "_contracts");

  fs.cpSync(src, dest, { recursive: true });
}

// Main function
(function main() {
  let links = [];
  walkDir(inputDir, (dir, file) => {
    let link = processFile(dir, file);
    if (link) links.push(link);
  });
  generateOverview(links);
  copyContracts();
  console.log("Documentation and contracts copied successfully.");
})();
