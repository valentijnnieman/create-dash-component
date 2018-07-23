#! /usr/bin/env node

const chalk = require("chalk");
const copyBundle = require("./copy-bundle");
const extractMeta = require("./extract-meta");

const args = process.argv.slice(2);

const componentPath = args[0];
const buildFileLocation = args[1];

introMessage();
// try {
//   shell.exec("dash-extract-meta " + componentPath);
// } catch(error) {
//   console.log(error);
//   process.exit(1);
// }

createDashComponent();

function createDashComponent() {
  const componentPath = args[0];
  const buildFileLocation = args[1];
  try {
    extractMeta(componentPath);
  } catch (error) {
    console.log(chalk.red("\n", error));
    process.exit(1);
  }
  try {
    copyBundle(buildFileLocation);
  } catch (error) {
    console.log(chalk.red("\n", error));
    process.exit(1);
  }

  successMessage();
}

function introMessage() {
  console.log("\n-------------------------");
  console.log("| create-dash-component |");
  console.log("-------------------------\n");
}

function successMessage() {
  console.log("\n");
  console.log(
    chalk.greenBright("Success! Install your new Dash component by running: ")
  );
  console.log(chalk.yellowBright("python setup.py install"));
  console.log(chalk.greenBright("in your terminal!"));
}
