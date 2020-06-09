# Social Network with NodeJS, ReactJS + MongoDB
This project is a social network with basic features, but my wish is to add new features and also improve existing ones. The technologies used in this project are: NodeJS with its micro framework expressJS on the server side, on the client side it was developed with ReactJS and finally the database was created with MongoDB, in the future trying to add new technologies to make and improve the project.

# Requirements
<div>
<ul>
  <li>NPM >= <b>10.0.3</b></li>
  <li>MongoDB</li>
<ul/> 
</div>  
  
# Usage Tips
After cloning or downloading the project it is necessary to install the dependencies with the command: <b> npm install </b>, this command must be executed at the root of both projects, that is, in the folders: appfront and nodeapi.

# Configuration of environment variables
For the project to work perfectly on your machine, you need to configure all the environment variables, for that you need to create an .env file based on the .env_example file, in this file you will need to fill in all the variables, below is listed all variables along with their descriptions:

<h4>Environment variables of the appfront project</h4>
<ul>
  <li>REACT_APP_API_URL=Server url</li>
  <li>REACT_APP_ID_CLIENT_GOOGLE=Google customer ID, this key allows login by Google</li>
</ul>

<h4>Environment variables of the nodeapi project</h4>
<ul>
  <li>MONGO_URI=MongoDB database URI</li>
  <li>MONGO_URILOCAL=Local URI of the MongoDB database, this URI is being used in the local project.</li>
  <li>PORT=Project door.</li>
  <li>JWT_SECRET=Project secret key.</li>
  <li>CLIENT_URL=Client project URL.</li>
  <li>NODE_MAIL_HOST=Your email server host.</li>
  <li>NODE_MAIL_PORT=Your email server port.</li>
  <li>NODE_MAIL_USER=Your email server user.</li>
  <li>NODE_MAIL_PASS=Your email server password.</li>
  <li>NODE_MAIL_FROM=Your email server standard sender.</li>
</ul>
