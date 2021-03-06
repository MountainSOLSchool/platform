# Mountain SOL Platform

[![Deploy Firebase Functions on merge](https://github.com/MountainSOLSchool/platform/actions/workflows/firebase-functions-merge.yml/badge.svg)](https://github.com/MountainSOLSchool/platform/actions/workflows/firebase-functions-merge.yml) [![Deploy to Firebase Hosting on merge](https://github.com/MountainSOLSchool/platform/actions/workflows/firebase-hosting-merge.yml/badge.svg)](https://github.com/MountainSOLSchool/platform/actions/workflows/firebase-hosting-merge.yml)

<img src="https://avatars.githubusercontent.com/u/88068648?s=400&u=54adb4c777bdf083573ef7126a6c69ed2d0849f8&v=4" height="100px">

<img src="http://ForTheBadge.com/images/badges/built-with-love.svg" height="25px">

This monorepository is home to apps and libraries that serve the Mountain SOL organization.

## Setup

Run `npm run install:all`.

## Functions

Run the Firebase functions locally with `npm run serve:functions`.

## Portal

Run the frontend portal with `npm run serve:portal` and view at http://localhost:4200/.

The default configuration uses remote addresses for Firebase functions. Run `npm run serve:dev:portal` to develop against locally served functions.

### Deployed

`main` is continuously deployed to https://mountain-sol-platform.web.app/
