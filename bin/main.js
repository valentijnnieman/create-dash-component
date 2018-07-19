#! /usr/bin/env node

const shell = require('shelljs');

const args = process.argv.slice(2);

if(args.length < 2) {
  console.error("Please specify path to components you want to transform, and the location of your build folder, i.e. create-dash-component src/components build")
} else {
  const componentPath = args[0];
  const buildFileLocation = args[1];
  console.log("=========================");
  console.log("| create-dash-component |");
  console.log("=========================");

  shell.exec("dash-extract-meta " + componentPath);

  shell.exec("dash-copy-bundle " + buildFileLocation)
  console.log("==========================");
  console.log("| Success! Install your   |");
  console.log("| new dash component by   |");
  console.log("| running:                |");
  console.log("| python setup.py install |");
  console.log("==========================");
}
