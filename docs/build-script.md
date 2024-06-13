## Build Script Documentation

This build script is designed for a Node.js environment to automate the processing of YAML files within the `contracts` directory and generate corresponding HTML documentation files. It outputs these files into a `build` directory while preserving the original folder structure. The script also generates an overview HTML file that provides links to all the generated HTML documents, arranged according to the directory structure.

### Overview

- **Source Directory**: `contracts`
- **Output Directory**: `build`
- **Ignored Directories**: `_base tmf`, `_examples`, `assets`
- **Features**:
  - Recursively reads all YAML files from the `contracts` directory, excluding specified directories.
  - Generates an HTML file for each YAML file using EJS templates.
  - Retains the original subfolder structure in the output directory.
  - Copies the entire `contracts` directory to the `build` directory as `_contracts`.
  - Creates an overview HTML file in the `build` directory that links to each HTML document, reflecting the folder hierarchy.

### Requirements

- **Node.js**: Ensure Node.js is installed on your system.
- **Dependencies**: The script uses `yaml`, `ejs`, and native `fs` and `path` modules. Dependencies can be installed via npm:
  ```bash
  npm install
  ```

### Usage

1. **Place the script**: Ensure the script `build.js` is placed at the root of your project.
2. **Run the script**: Execute the script using Node.js by running:
   ```bash
   npm run build # node build.js
   ```
3. **Check the output**: The generated HTML files will be available in the `build` directory.

### Script Details

- **`processFile` Function**: Reads a YAML file, parses it using the `yaml` module, and generates an HTML file based on the EJS template. The HTML file includes the title and version from the YAML's `info` section and the relative path to the original YAML file, now pointing to its new location in `_contracts`.
- **`walkDir` Function**: Recursively traverses the `contracts` directory, processing each YAML file and skipping ignored directories.

- **`generateOverview` Function**: Compiles an HTML file that serves as an index, providing links to all processed HTML documents. The links are structured to reflect the directory hierarchy of the original YAML files.

- **`copyContracts` Function**: Copies the `contracts` directory to `build/_contracts`, ensuring that the original YAML files are also available in the output directory for reference.

### File Structure Example

```
project-root/
│
├── contracts/             # Source YAML files
│   ├── service ordering/
│   │   └── tmf641-servicenow.0.3.0.yaml
│   └── work order/
│       └── tmf697-mulesoft-servicenow.0.1.0.yaml
│
├── build/                 # Output HTML files and copied contracts
│   ├── service ordering/
│   │   └── tmf641-servicenow.0.3.0.html
│   ├── work order/
│   │   └── tmf697-mulesoft-servicenow.0.1.0.html
│   ├── _contracts/        # Copied YAML files
│   │   ├── service ordering/
│   │   │   └── tmf641-servicenow.0.3.0.yaml
│   │   └── work order/
│   │       └── tmf697-mulesoft-servicenow.0.1.0.yaml
│   └── index.html         # Overview file
│
└── scripts/build.js               # Build script
```
