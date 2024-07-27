# Mountain SOL Platform

[![Deploy Firebase Functions on merge](https://github.com/MountainSOLSchool/platform/actions/workflows/firebase-functions-merge.yml/badge.svg)](https://github.com/MountainSOLSchool/platform/actions/workflows/firebase-functions-merge.yml) [![Deploy to Firebase Hosting on merge](https://github.com/MountainSOLSchool/platform/actions/workflows/firebase-hosting-merge.yml/badge.svg)](https://github.com/MountainSOLSchool/platform/actions/workflows/firebase-hosting-merge.yml)

<img src="https://avatars.githubusercontent.com/u/88068648?s=400&u=54adb4c777bdf083573ef7126a6c69ed2d0849f8&v=4" height="100px">

<img src="http://ForTheBadge.com/images/badges/built-with-love.svg" height="25px">

This monorepository is home to apps and libraries that serve the Mountain SOL organization.

## Setup

### Dependencies

Run `npm ci`.

### VSCode Extension Recommendations

-   [Nx Console](https://marketplace.visualstudio.com/items?itemName=nrwl.angular-console) enables you to run build and serve commands with a GUI

## Firebase Functions

Run the Firebase functions locally with `npx nx run functions:serve`.

## Enrollment Portal (Angular)

Run the frontend portal with `npx nx run enrollment-portal:serve:developmentRemoteFunctions` and view at http://localhost:4200/.

The default configuration uses remote addresses for Firebase functions. Run `npx nx run enrollment-portal:serve` to develop against locally served functions.

### Deployment

`main` is continuously deployed to https://mountain-sol-platform.web.app/

## Student Portal (React)

Run the frontend portal with `npx nx run student-portal:serve` and view at http://localhost:4200/.

### Deployment

`main` is continuously deployed to https://main.dtpci3w8k8pee.amplifyapp.com/
