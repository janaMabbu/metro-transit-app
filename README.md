# metro-transit-app

# Requirement
Node 8.15 or greater and Npm 6.4.1 or greater

# Installation
1. git clone the project
2. cd metro-transit-app
3. npm i
4. npm start
5. hit http://127.0.0.1:1337/  in the browser

# Testing
1. npm run test - to run eslint, csslint, jest unit test case and snapshot test case
2. npm run test:js:snapshot - to run all snapshot test cases
3. npm run test:update - to update snapshot test cases after any code changes to components.
4. npm run test:js:unit - to run all  unit test cases


# Task Achievement
1. Select a bus route from a list of available routes  -- (completed)
2. Select a direction for a bus route -- (completed)
3. For a given route and direction, display the stops  - (completed)
4. Respond reasonably to browser back and forward buttons (for example, implement application routing)-- (completed)
5. Include test code that validates your application works as expected. (completed)
6. Include a README.md file -- (completed)

# Application Routing
I had implemented application routes with react-router library and these are some possible routes that this application supports and browser back and forward works reasonably.

1. http://127.0.0.1:1337/#/nexttrip     (default route)
2. http://127.0.0.1:1337/#/nexttrip/901  (with  routeID)
3. http://127.0.0.1:1337/#/nexttrip/901/1   (with routeId and Direction ID)
4. http://127.0.0.1:1337/#/about-us 
5. http://127.0.0.1:1337/#/contact-us

# Application-state Justification
I had used Redux for maintaining the application state.

Although maintaining the app data with the local state would be ideal for small applications, I had used react-redux to maintain the state and using redux-thunk as middle-ware to dispatch async actions for one particular reason.
## Reason
The reason is when the user selects the routes and view the stops and navigates to contact us page and the stops componnet unmounts and looses its local state. By having the application state on redux, the component can retain the user selection and data when the user clicks the browser back and lands on this page and the component mounts using the data from redux. so it does not need to make service calls to get the data as the data is readily available on redux. so it optimizes the application and improves performance.

# Code Overview

### /src/components 
it has all the components and each componnet folder has a .jsx file and .less file and __tests__ folder which will have some Enzyme snapshot test cases for that component.

### /src/ducks 
this folder has all the business logic that a component needs, each file contains the corresponding actions, reducers and readers and async functions that component triggers or needs.

### /src/__tests __ 
it has the test cases for the duck files, it's mostly unit test cases for the functions present in corresponding duck files.

# CSS Overview
I had used Less  CSS preprocessor in the project and again this is not needed for an application of this size, but I have declared some variables such as colors, width, and image path and reused them, it would make developers life much easy if we want to rebrand the site with different colors and different images or width.

# Bundle
npm run build: bundle to build the app. But the app is not yet production-ready because of some reasons below

1. To optimize the app, I made some of the dependencies/libraries are marked as external, and these assets are served by webpack dev server when we run the app locally, these assets have to be copied from node modules to another folder and should be included in the build folder and a web server which hosts the application should serve these files or we can complete on rely on CDN's for loading these libraries.

2. bundle/code splitting and fingerprinting of the files is not done. has to setup webpack configuration for that.
