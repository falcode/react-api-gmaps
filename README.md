# Seat : CODE Challenge

### Technical Test - Google Maps API Route Maker

The purpose of this project is to create a route maker with Google Maps API with an external API fetched information.

### App top-level directory layout

    .src
    ├── reducers                   # Contains all the actions and dispatches from the store
    ├── styles                     # Contains all the scss files and styles
    ├── components                 # Contains all the reusable modules
    ├── utils                      # Contains all the reusable data and functions
    └── services                   # Contains all the APIs services and UI services

> **External Libraries ()**: 
[SASS](https://github.com/sass/node-sass),
[Redux Devtools Extension](https://github.com/zalmoxisus/redux-devtools-extension),
[Middleware Thunk](https://github.com/reduxjs/redux-thunk),
[Jest Fetch Mock](https://www.npmjs.com/package/jest-fetch-mock),
[Enzyme](https://enzymejs.github.io/enzyme/)


## Available Scripts

In the project directory, you can run:

### `yarn start` or `npm start`

Runs the app in the development mode.<br />
Open [http://localhost:3000](http://localhost:3000) to view it in the browser.

The page will reload if you make edits.<br />
You will also see any lint errors in the console.

### `yarn test` or `npm test`

Launches the test runner in the interactive watch mode.<br />

### `yarn build` or `npm build`

Builds the app for production to the `build` folder.<br />
It correctly bundles React in production mode and optimizes the build for the best performance.
The build is minified and the filenames include the hashes.