#! /usr/bin/env node

const shell = require('shelljs');
const find = require('find');
const cp = require('cp');

// Note that create-dash-component currently doesn't pass in
// args to dash-copy-bundle, so it just uses the default build/static/js
// as used in create-react-app
const args = process.argv.slice(2);

const package = require(process.cwd() + '/package.json');

const inputFolder = args[0] || "./build/static/js/"
const outputFolder = package.name.replace('-', '_'); // replace - with _ so python can read it 
const fileName = args[1] || /\.js$/

console.log("Looking for build file in: " + inputFolder)

find.file(fileName, inputFolder, files => {
  console.log(`Found ${files}, copying...`)
  shell.exec(`cp ${files[0]} ./${outputFolder}/bundle.js`)
  console.log(`Copied ${files} as bundle.js into ${outputFolder}`)
  shell.exec(`cp ${process.cwd()}/package.json ./${outputFolder}/package.json`)
  console.log("Copied package.json into " + outputFolder)

  console.log("Creating __init__.py file...")
  cp.sync(__dirname + '/init-file.py', outputFolder + '/__init__.py');
  console.log('Created __init__.py file in ' + outputFolder)

  console.log("Creating setup.py file...")
  cp.sync(__dirname + '/init-setup.py', 'setup.py');
  console.log('Created setup.py file in ' + outputFolder)
}).error(err => {
  console.log(err)
})

