## Basic example setup for API design

### [See live demo of docs](https://yannickschuchmann.github.io/basic-api-design-setup/docs/tmf-641)

**Table of content:**

- [Installation](#installation)
- [Usage](#usage)
- [Roadmap](#roadmap)

<a id="installation"></a>

## Installation

Install all dependencies. NodeJS >=18.16 is at least required.

`npm install`

<a id="usage"></a>

## Usage

### Serve Documentation (powered by [Stoplight Elements](https://github.com/stoplightio/elements))

You can serve the documentation via:

`npm start`

### Linting (powered by [Stoplight Spectral](https://github.com/stoplightio/spectral))

You can lint manually with spectral-cli:

`npm run lint`

Otherwise linting is run before each commit automatically.

### Mocking (powered by [Stoplight Prism](https://github.com/stoplightio/prism))

You can run a mock server for a spec file:

`npm run mock $path-to-file`

e.g. `npm run mock apis/tmf-641/TMF641-ServiceOrdering-v4.1.0.yaml`

### Validating (powered by [Stoplight Prism](https://github.com/stoplightio/prism))

You can validate a API spec file against an API implementation by:

`npm run validate $path-to-file $url-to-implementation`

e.g. `npm run validate apis/tmf-641/TMF641-ServiceOrdering-v4.1.0.yaml https://tbd.io`

<a id="roadmap"></a>

## Roadmap

- [x] Linting
- [x] Docs generation
- [x] Mocking server
- [x] Validating against API Implementations
- [ ] Linting on commit hook
- [ ] Testing
