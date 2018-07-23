#! /usr/bin/env node

const fs = require("fs");
const path = require("path");
const mkdirp = require("mkdirp");
const reactDocs = require("react-docgen");

const metadata = Object.create(null);

function extractMeta(componentPaths = "src/components") {
  try {
    componentPaths = [componentPaths]
    componentPaths.forEach(componentPath =>
      collectMetadataRecursively(componentPath)
    );
    writeOut(metadata);
  } catch (error) {
    throw error;
  }
}

function writeError(msg, filePath) {
  if (filePath) {
    process.stderr.write(`Error with path ${filePath}`);
  }

  process.stderr.write(msg + "\n");
  if (msg instanceof Error) {
    process.stderr.write(msg.stack + "\n");
  }
}

function parseFile(filepath) {
  const urlpath = filepath.split(path.sep).join("/");
  let src;

  if (![".jsx", ".js"].includes(path.extname(filepath))) {
    return;
  }

  try {
    src = fs.readFileSync(filepath);
    metadata[urlpath] = reactDocs.parse(src);
  } catch (error) {
    writeError(error, filepath);
  }
}

function collectMetadataRecursively(componentPath) {
  if (fs.lstatSync(componentPath).isDirectory()) {
    let dirs;
    try {
      dirs = fs.readdirSync(componentPath);
    } catch (error) {
      writeError(error, componentPath);
    }
    dirs.forEach(filename => {
      const filepath = path.join(componentPath, filename);
      if (fs.lstatSync(filepath).isDirectory()) {
        collectMetadataRecursively(filepath);
      } else {
        parseFile(filepath);
      }
    });
  } else {
    parseFile(componentPath);
  }
}

function writeOut(result) {
  // console.log(JSON.stringify(result, '\t', 2));
  const componentPackage = require(process.cwd() + "/package.json");
  const package_name = componentPackage.name.replace("-", "_");
  mkdirp(package_name, err => {
    if (err) {
      return console.log(err);
    }

    console.log("Created build directory.");
  });
  fs.writeFile(
    package_name + "/metadata.json",
    JSON.stringify(result, "\t", 2),
    err => {
      if (err) {
        return console.log(err);
      }

      console.log("Created build directory as " + package_name);
    }
  );
}

module.exports = extractMeta;
