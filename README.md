# We have issues

Check on a github repository issues.

### Prerequisites

Your must have a compatible version of node and preferably\* yarn installed in your machine.

\* npm must work just as good, but this project was not developed or tested using npm.

### Running in your local machine

To put it to work right away:

1. install all project dependencies with `yarn install`
2. start the development server with `yarn dev`

### Building to production

Follow the steps bellow to produce a production ready bundle:

1. install all project dependencies with `yarn install`
2. generate the production ready bundle with `yarn build`
3. serve the bundle with `yarn start`

### Heroku support

All configuration needed for deploying it to heroku is already made. So all you need to do to deploy to heroku is:

1. clones the git repository to your machine `git clone https://github.com/IgorCRD/issues.git`
2. changes from current directory to repository directory `cd issues`
3. creates a heroku app where you app is going to live `heroku create [appName]`
4. pushes the current version to heroku and starts the deploy pipeline `git push heroku master`

PS.: You must have the Heroku CLI installed and logged in your machine
