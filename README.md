## Basic example setup for API design

### Installation

Install all dependencies. NodeJS >=18.16 is at least required.

`npm install`

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
