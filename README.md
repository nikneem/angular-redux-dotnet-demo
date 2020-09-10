# angular-redux-dotnet-demo
This is a demo project showing how to use Angular with Redux and call a DotNet (Core 3.1) Backend

## How to
This repository contains two projects. One is an ASP DotNet Core (3.1) backend API. This project connects with a database. The repo contains an import file so you can start with a set of dummy data (car tires). The backend serves a list of these card tires.

The second project is an Angular 10.x project using Redux. This demo project shows you how you can use the power of Redux to (for example) set and define filters, and act upon that. The project contains one page (a list page) with three types of filter options:
- The address / location bar
- A basic name filter
- A detailed property filter

All these filter options perform actions in Redux to define a data filter. When this data filter changes, the backend will be requested with the new filter and updates the list with the latest search results.

## Goal
This project shows you the power of Redux. The 'object to maintain' is the data filter. Three different components affect that filter, but redux takes the responsibility to maintain the filter and is the single source of truth concerning that filter.

This takes away a lot of stress with maintaining events and event handlers and confusion who is responsible for maintaining the data filter. This concept can be applied to loads of different scenarios.