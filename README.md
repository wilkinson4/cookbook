# What's Cooking?
Welcome to What's Cooking! Please follow the setup instructions below to test out this app!

## Setup Instructions

1. Clone this repository to your local machine via the following command: `git clone git@github.com:wilkinson4/cookbook.git`
2. Change into the cookbook directory that git created
3. Create an api/ directory and a database.json file in the api/ directory
4. Copy and paste the following data structure in your database.json file: 
   
`{
  "users": [],
  "recipes": [],
  "tags": [],
  "tagsRecipes": []
}`

5. Run `npm install` in your terminal to install all of the dependencies.
6. In your api directory run `json-server -p 8088 database.json -w`
7. In the root directory of your project `npm start`