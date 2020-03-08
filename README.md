# API Test Automation

API Test for openweather API using Mocha, Chai and Chai-http

## Getting started
1. Have a version of node. This test framework is currently tested to support `v12.16.1`
2. Clone this repository.
3. Install all dependencies. Run `npm install` on the terminal. This will generate a `node_modules` file on the project directory.
4. Create a `.env` file on the project root directory. It will require an openweather API key, as set in the `.env.sample`. The test runner will check for these required ENV values

## Running the test

Run `npm test` to start the test.

## Structure

1. GIVEN `(describe)`
2. WHEN `(before)`
3. THEN `(it)`