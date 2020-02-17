# Digital_Breakthrough-Regional_Stage
Server application for checking affiliations of persons on the public services portal (Regional stage of the Digital Breakthrough contest)



# Digital_ENV

![image alt](https://raw.githubusercontent.com/D1mk4Novikov/Digital_ENV/master/Logo/Digital_ENV_Logo.png)

This website allows you to get information about purchases and monitor their implementation...

## Table of Contents

* [Installation](#installation)
	* [Server setup](#server-setup)
	* [GitClone](#gitclone)
* [Usage information](#usage-information)
	* [Server startup](#server-startup)
	* [Launch website](#launch-website)

## Installation

### Server setup

To run this project, use a server based on Linux OS.
First, you need install NPM and Node.js interpretator for starting this project. First use these commands to configure the server:

```bash
sudo apt update
```

```bash
sudo apt install nodejs
```

```bash
sudo apt install npm
```

To check the correctness of the settings, use the Node.js module version verification commands.

```bash
node -v
```

and

```bash
npm -v
```

### GitClone

Second, you need clone this repository to your server machine.

```bash
git clone https://github.com/D1mk4Novikov/Digital_ENV.git
```

## Usage information

### Server startup

In the terminal in the Server_Application directory you need to use this command to run the Server.js file.

```js
node Server.js
```

The server application will be monitored on the standard port for the HTTP standard - 8080.

### Launch website

To open the main page of the website, use the following request in the browser:

```bash
http://IP_Address:8080
```
Where IP_Address is the IP Address of your web server.

If the application was deployed locally on your machine, instead of IP_Address use localhost:

```bash
http://localhost:8080
```
