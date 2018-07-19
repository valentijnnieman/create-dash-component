## create-dash-component
### A CLI for creating Dash components from React components

### Installing
- run `npm install create-dash-component` in your terminal, optionally you can add `-g` to install it globally.

### How to use
- `cd` into the React project you want to convert
- Make sure you've built the project - if it's a `create-react-app` project, you want to run `npm run build`
- Run `create-dash-component %path_to_components% %path_to_build_folder%` i.e. for a `create-react-app`, you should run: `create-dash-component src/components build/static/js`
- create-dash-component will create a component suite with the name of the project, taken from `package.json`.
- You can install your newly created component suite using `python setup.py install`! Now, you should be able `import` your new suite in Dash!