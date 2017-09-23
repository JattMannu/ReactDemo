# ReactDemo

Getting Started

Fork the repository from the hackreactor org to your own GitHub account
The repository will have the following naming convention: adsk-{your location}-{year}-{two digit start month}-react-components
Clone the repository to your local machine
Run yarn install to install the project dependencies
Build your app bundle by running yarn run build, which builds the bundle based on the configuration contained within webpack.config.js
Start your server from the command line by running the command yarn start
App Setup

We're using the simple Node server live-server to serve up files. This server automatically watches for changes to client side code and instructs the browser to reload upon each change.
The script tag in index.html loads our JavaScript bundle, which will contain all of the necessary libraries and our code once we run the build script.
Bare Minimum Requirements
