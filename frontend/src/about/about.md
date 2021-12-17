# About this project

## What is it?

- It is a simple AirBnb clone where users can see places posted by users on the platform.

![Users page](https://i.imgur.com/PQvWbkR.png)

- Each user has an email, name, password & a profile picture. A picture upload also shows a preview of the image after upload.

![Sign up page](https://i.imgur.com/gaSSV2F.png)

- A place has a title, a short description, address & a cover photo. The app automatically generates a Google maps overlay for the inputted address for that particular place. I used Google Maps API for this.

![Place](https://i.imgur.com/quwyDcp.png)

![Map overlay](https://i.imgur.com/EkLcvay.png)

- Application also uses client's browser local storage for storing JWT tokens which expire after 1 hour. This means that application can auto-login & auto-logout the user, depending on when the token was issued.

![Browser local storage](https://i.imgur.com/2LLJ2Yo.png)

- App also has a responsive design, which looks good on a small phone as well as a big screen. This is how it looks on an iPhone X:

![Responsive design for mobile](https://i.imgur.com/p7v8j7d.png)

## Tech Stack

### Frontend:

1. React as a Javascript framework for state management & making calls to the backend.
2. CSS & Bootstrap 5 for styling.

### Backend

1. NodeJS as a Javascript runtime
2. Express as a framework to easily handle routes & middlewares.
3. JWT tokens for authentication & authorization.
4. MongoDB as a database.