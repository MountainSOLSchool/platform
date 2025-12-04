# firebase-enrollment-functions-donate

This library provides the Firebase Cloud Function for processing donations via Braintree.

## Features

- Supports both credit card and Venmo payments
- Collects donor information (name, email, address, referral source)
- Stores donation records in Firestore
- Handles transaction errors and retries

## Running unit tests

Run `nx test firebase-enrollment-functions-donate` to execute the unit tests via [Jest](https://jestjs.io).
