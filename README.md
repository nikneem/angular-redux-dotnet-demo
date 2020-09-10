# angular-redux-dotnet-demo
This is a demo project showing how to use Angular with Redux and call a DotNet (Core 3.1) Backend

## How to
This repository contains two projects. One is an ASP DotNet Core (3.1) backend API. This project generates a random set of car tires in a repository and services that. You can start this project and navigate to /api/catalog to see the list of tires generated.

> You need to configure the frontend project so it calls the correct backend. It's a good idea to run the backend project and see the location in the browser. Copy the location and replace the value `backendUrl` in the front end project'a `src/environments/environment.ts` file. Be sure to remove any trailing slashes if there are any

The second project is an Angular 10.x project using Redux. This demo project shows you how you can use the power of Redux to (for example) set and define filters, and act upon that. The project contains one page (a list page) with three types of filter options:
- The address / location bar
- A basic name filter
- A detailed property filter

All these filter options perform actions in Redux to define a data filter. When this data filter changes, the backend will be requested with the new filter and updates the list with the latest search results.

> To run this project, you need to have NodeJS, and the Angular CLI installed. Install NodeJS v12+ and open a command window. Type `npm i @angular/cli` to install the Angular CLI. Now type `npm i` to restore all the packages the project depends on. Then run `ng serve -o` to run the project and open it in a browser.


## Goal
This project shows you the power of Redux. The 'object to maintain' is the data filter. Three different components affect that filter, but redux takes the responsibility to maintain the filter and is the single source of truth concerning that filter.

This takes away a lot of stress with maintaining events and event handlers and confusion who is responsible for maintaining the data filter. This concept can be applied to loads of different scenarios.