## create-dash-component
### A CLI for creating Dash components from React components
![image](https://github.com/valentijnnieman/create-dash-component/blob/master/cdc-instructions.gif)
### Installing
- run `npm i -g create-dash-component` in your terminal.

### How to use
- `cd` into the React project you want to convert
- Make sure you've built the project - if it's a `create-react-app` project, you want to run `npm run build`
- If you're working in a `create-react-app` project, you can simply run `create-dash-component` in your project root. Otherwise, run `create-dash-component %path_to_components% %path_to_build_folder%`, specifying *where your components are located and where you built the files*.
- create-dash-component will create a component suite with the name of the project, taken from `package.json`.
- You can install your newly created component suite using `python setup.py install`! Now, you should be able `import` your new suite in Dash!
