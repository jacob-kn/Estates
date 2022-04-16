<h1 align="center"> Estates </h1>

<h4 align="center">A real estate web application.</h4>

## Table of Contents
- [Table of Contents](#table-of-contents)
- [About](#about)
- [Usage](#usage)
- [Acknowledgements](#acknowledgements)
- [Authors](#authors)

## About

The Estates web application provides a platform for buyers, sellers, realtors, and even guests for anything you would expect from a real estate application:
- Browse properties with filters and a sorting system
- List properties as a seller or a realtor
- Save properties as a buyer
- Leave comments on a realtor page
- Make an offer on a property
- ... And more!

For CPSC 471 at the University of Calgary Winter 2022

## Usage
This is the production build. Use the website here: [https://estatesdomain.herokuapp.com/](https://estatesdomain.herokuapp.com/)

If the deployed website does not work, you may run the production build with the appropriate .env file (provided in the CPSC 471 dropbox) by following the instructions below:
1. Run `git clone https://github.com/jacob-kn/Estates` or download and unzip the source code from the github repository to your desired directory
2. Move/copy the provided `.env` file to the created Estates folder
3. In the Estates directory, run `npm install` in a terminal to install all server dependencies (you will need to have Node.js installed to do this)
4. Navigate to the frontend directory using `cd frontend` from the Estates folder
5. Run `npm install`, then run `npm run build`
6. Go back to the Estates directory using `cd ..`
7. Finally, start the server by running `npm start`
8. If the PORT environment variable in the .env file has not been changed, the server will start on [http://localhost:8000](http://localhost:8000). Open the server in a browser to use the application.


## Acknowledgements
- This project was based on [this tutorial](https://www.youtube.com/playlist?list=PLx5VofXGboI3keWyKVqmEDXT4Fk-utH2P).

## Authors

* **Jacob Nguyen** - [jacob-kn](https://github.com/jacob-kn)
* **Cheyenne Goh** - [Cheyenne Goh](https://github.com/cheyennegoh)
* **Adeshpal Virk** - [Adeshv1](https://github.com/Adeshv1)

