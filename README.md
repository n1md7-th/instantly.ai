# Instantly.AI Coding Assignment

# Assignment:
Develop a simple web app allowing users to send emails. The app should have the following features:  
## 1. Sidebar
1. The main page should have a sidebar with a list of emails (Apple Mail style)
2. When selecting an email from the sidebar, the selected email should be displayed on the right side of the screen

## 2. Search bar
1. The sidebar should contain a search bar at the top
2. When typing text in the search bar, the list of emails in the sidebar should be filtered based on the search text
   * We should do the filtering on the backend
   * We should debounce the requests to the backend (i.e. wait for 500ms after the user stops typing before sending the request)
   * The search should return results where either the `to`, `cc`, `bcc`, `subject`, or `subject` fields contain the search text

## 3. Sending emails
The main page should have a button to compose a new email (placed at the bottom right corner of the screen). The following fields should be present in the compose email form:
   * To
   * CC
   * BCC
   * Subject
   * Body


# Notes:
1. No need to actually send the email - it's enough to save it in the database
2. Do not spend more than 1h on this assignment, just do as much as you can in that time

# Structure
This is a monorepo. It has two folders:  
1. `frontend`: This is the frontend of the application. It is built using Next.js.  
2. `backend`: This is the backend of the application. It is built using Fastify.

# Setup
1. `cd frontend` - Go to the frontend folder
2. `yarn install` - Install the dependencies
3. `yarn dev` - Start the development server (http://localhost:3000)
4. `cd ../backend` - Go to the backend folder
5. `yarn install` - Install the dependencies
6. `yarn dev` - Start the development server (http://localhost:3001)

# Design
1. [MUI](https://mui.com/) is installed and used for the design of the frontend.
