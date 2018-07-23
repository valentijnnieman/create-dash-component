#! /usr/bin/env node

const chalk = require('chalk');
const copyBundle = require('./copy-bundle')
const extractMeta = require('./extract-meta')

const args = process.argv.slice(2);

if(args.length < 2) {
  console.error("Please specify path to components you want to transform, and the location of your build folder, i.e. create-dash-component src/components build")
  process.exit(1);
} else {
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

}

function createDashComponent() {
  const componentPath = args[0];
  const buildFileLocation = args[1];
  try {
    extractMeta(componentPath)
  } catch(error) {
    console.log(chalk.red('\n', error))
    process.exit(1)
  }
  try {
    copyBundle(buildFileLocation);
  } catch(error) {
    console.log(chalk.red('\n', error))
    process.exit(1)
  }

  successMessage();
}

function introMessage() {
  console.log("\n-------------------------")
  console.log("| create-dash-component |");
  console.log("-------------------------\n");
}

function successMessage() {
  console.log("\n");
  console.log(chalk.greenBright("Success! Install your new Dash component by running: "));
  console.log(chalk.yellowBright("python setup.py install"));
  console.log(chalk.greenBright("in your terminal!"));
}