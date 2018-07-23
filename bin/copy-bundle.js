#! /usr/bin/env node

const shell = require("shelljs");
const chalk = require("chalk");
const find = require("find");
const cp = require("cp");
// const args = process.argv.slice(2);

// const inputFolder = args[0] || "./build/static/js/";
// const fileName = args[1] || /\.js$/;

function copyBundle(inputFolder = "./build/static/js/", fileName = /\.js$/) {
  console.log("Looking for build file in: " + inputFolder);

  const package = require(process.cwd() + "/package.json");
  const outputFolder = package.name.replace("-", "_"); // replace - with _ so python can read it

  try {
    const files = find.fileSync(fileName, inputFolder);
    console.log(`Found ${chalk.yellow(files)}, copying...`);
    shell.exec(`cp ${files[0]} ./${outputFolder}/bundle.js`);
    console.log(
      `Copied ${chalk.yellow(files)} as ${chalk.magenta(
        "bundle.js"
      )} into ${outputFolder}`
    );
    shell.exec(
      `cp ${process.cwd()}/package.json ./${outputFolder}/package.json`
    );
    console.log(`Copied ${chalk.yellow("package.json")} into ${outputFolder}`);

    cp.sync(__dirname + "/init-file.py", outputFolder + "/__init__.py");
    console.log(`Created ${chalk.yellowBright('__init__.py')} file in ${outputFolder}`);

    cp.sync(__dirname + "/init-setup.py", "setup.py");
    console.log(`Created ${chalk.yellowBright('setup.py')} file in ${outputFolder}`);
  } catch (error) {
    const buildErrorMsg =
      "Couldn't find build file! Are you sure you pointed to the right location? In create-react-app, this would be build/static/js\n\n";
    throw new Error(buildErrorMsg);
  }
}

module.exports = copyBundle;
