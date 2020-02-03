# meetro-transit-app

# Requirement
Node 8.15 or greater and Npm 6.4.1 or greater

# Installation
1. git clone the project
2. cd metro-transit-app
3. npm i
4. npm start
5. hit http://127.0.0.1:1337/  in the browser

# Testing
1. npm run test - to run eslint, csslint, jest unit testcase and snapshot testcase
2. npm run test:js:snapshot" - to run snapshot testcase
3. npm run test:js:update - to update snapshot testcases after any code chnages to componnets.
4. npm run test:js:unit - to run unit testcase

# Bundle
npm run build:bundle to build the app. But the app in not yet production ready beccuse of some reasons below

1. To optimize the app, I made some of the dependencies/libraries are marked as external, and these assests have to be copied from node modules to an another folder and should be included in the build folder and a webserver which hosts the application should serve these files.
2. bundle splitting and fingerprinting of the files is not done.

# Task Achivement
1. Select a bus route from a list of available routes  -- (completed)
2. Select a direction for a bus route -- (ccompleted)
3. For a given route and direction, display the stops  - (completed)
4. Respond reasonably to browser back and forward buttons (for example, implement application routing)-- (completed)
5. Include test code that validates your application works as expected. (completed)
6. Include a README.md file -- (completed)

# Application Routing
I had implemented application routes with react-router library and these are some possible routes that this application supports

http://127.0.0.1:1337/#/nexttrip     (default route)
http://127.0.0.1:1337/#/nexttrip/901  (with  routeID)
http://127.0.0.1:1337/#/nexttrip/901/1   (with routeId and Direction ID)
http://127.0.0.1:1337/#/about-us 
http://127.0.0.1:1337/#/contact-us
browser back and forward works reasonably.

# Application-state Justification
I had used Redux for maintaining the application state.

Although maintaing the app data with local state would be ideal for small applications , I had used react-redux to maintian the state and using redux thunk as middle-ware to dispach async actions for one particlar reason.
## Reason
The reason is when user selectes the routes and view ths stops and navigates to contact us page and stops componnet  un mounts and looses its local state. By having the application state on redux the componnet can  retain the user selection and data wheen user clicks browser back and lands on this page. so it doesn't need to make service calls to get the data as the data is readily available on redux. so it opmizes the application and improves performance.
