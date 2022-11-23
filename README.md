# Premium calculator
## _Plan management tool_

Premium calculator is a vanilla Javascript and Node project.

## Stack
- Node v18
- Vanilla javascript
- npm

## Features

- Query existing plans, with their plan, state, birthday or age.
- Fully customized query interface, With conditions to handle dates.
- Plans and states for the dropdown options will only render if they exist in the storage because of a pre-fetch on load.
- Error handling and suggestions if there aren't matches for your criteria.
- Frecuency calculator for the succesful results.
- Easy re-requerying.
- Plan creation interface with custom handlers on the fields.
- Easily customizable by any non-technical user.
- Auto refresh after creation or delete.

The software was designed to fullfil the Systems config specialist challenge.

## Infrastructure

Premium calculator uses a couple of open source projects to work properly:

- [node.js] - evented I/O for the backend
- [Express] - fast node.js network app framework
- [Webpack] - mandatory for bundling
- [jest] - most reliable testing framework

## Installation

Dillinger requires [Node.js](https://nodejs.org/) v18+ and npm to run.

Install the devDependencies with npm in root.

```sh
cd premium-calculator
npm install
```

To start a webpack server type:

```sh
npm start
```

Navigate to [http://localhost:8080/#/home][PlDb] to use the app.

