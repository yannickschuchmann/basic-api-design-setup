## X-Program API Documentation

**Table of content:**

- [Setup](#setup)
- [Usage](#usage)
- [Roadmap](#roadmap)

<a id="setup"></a>

## Setup

Install all dependencies. NodeJS >=18.16 is at least required.

`npm install`

Then we need to fetch the current master of x-program api contracts.

`npm run download-contracts`

Eventually we can run the build step to generate the documentation HTML files for each contract.

`npm run build`

More information about [what the build script does can be found here](./docs/build-script.md).

<a id="usage"></a>

## Usage

### Serve Documentation (powered by [Stoplight Elements](https://github.com/stoplightio/elements))

You can serve the documentation via:

`npm start`

This will spin up a [serve](https://github.com/vercel/serve) HTTP server on port 3000. You can adjust the server properties in [`serve.json`](./serve.json)

### Linting (powered by [Stoplight Spectral](https://github.com/stoplightio/spectral))

You can lint manually with spectral-cli:

`npm run lint`

### Mocking (powered by [Stoplight Prism](https://github.com/stoplightio/prism))

You can run a mock server for a spec file:

`npm run mock $path-to-file`

e.g. `npm run mock contracts/geo address/tmf673-arcgis.yaml`

### Contract testing (powered by [Stoplight Prism](https://github.com/stoplightio/prism))

You can validate a API spec file against an API implementation by:

`npm run validate $path-to-file $url-to-implementation`

e.g. `npm run validate contracts/geo address/tmf673-arcgis.yaml https://tbd.io`

<a id="roadmap"></a>

## Roadmap

- [x] Linting
- [x] Mocking server
- [x] Contract testing against API Implementations
- [x] Docs generation
