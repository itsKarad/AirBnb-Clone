# AirBnb Clone

# What is it?

It is a simple, full-stack AirBnb clone where users can list their own place for renting out to other users. Other users can also book a particular place and pay using Stripe. 

![screencapture-airbnb-karad-web-app-2021-12-25-09_46_18.png](AirBnb%20Clone%2048b6d688a4124e99b86bf1ffac96c85f/screencapture-airbnb-karad-web-app-2021-12-25-09_46_18.png)

## Each place has a

![Title & Thumbnail image](AirBnb%20Clone%2048b6d688a4124e99b86bf1ffac96c85f/Untitled.png)

Title & Thumbnail image

![Overview](AirBnb%20Clone%2048b6d688a4124e99b86bf1ffac96c85f/Untitled%201.png)

Overview

![A short description](AirBnb%20Clone%2048b6d688a4124e99b86bf1ffac96c85f/Untitled%202.png)

A short description

![List of available amenities](AirBnb%20Clone%2048b6d688a4124e99b86bf1ffac96c85f/Untitled%203.png)

List of available amenities

![Address](AirBnb%20Clone%2048b6d688a4124e99b86bf1ffac96c85f/Untitled%204.png)

Address

![Owner information](AirBnb%20Clone%2048b6d688a4124e99b86bf1ffac96c85f/Untitled%205.png)

Owner information

![Google maps overlay](AirBnb%20Clone%2048b6d688a4124e99b86bf1ffac96c85f/Untitled%206.png)

Google maps overlay

- Users can view other places and also book them for a given date interval. Users can also pay for the places using Stripe Checkout.

[Booking a place using Stripe](AirBnb%20Clone%2048b6d688a4124e99b86bf1ffac96c85f/stripe.mov)

Booking a place using Stripe

- Users can also view their recent bookings in a table format.

![screencapture-airbnb-karad-web-app-my-bookings-2021-12-25-10_47_25.png](AirBnb%20Clone%2048b6d688a4124e99b86bf1ffac96c85f/screencapture-airbnb-karad-web-app-my-bookings-2021-12-25-10_47_25.png)

## Each user has

1. an email
2. a secure password &
3. a profile photo 

![Untitled](AirBnb%20Clone%2048b6d688a4124e99b86bf1ffac96c85f/Untitled%207.png)

# Features

- Re-usable, DRY functional Portal React components used throughout the application used to action confirmations and error messages

![Map overlay](AirBnb%20Clone%2048b6d688a4124e99b86bf1ffac96c85f/Untitled%208.png)

Map overlay

![Error popups](AirBnb%20Clone%2048b6d688a4124e99b86bf1ffac96c85f/Untitled%209.png)

Error popups

![Action confirmations](AirBnb%20Clone%2048b6d688a4124e99b86bf1ffac96c85f/Untitled%2010.png)

Action confirmations

- Preview for uploaded image. This component is used many times in the application.
    
    [giphy.mp4](AirBnb%20Clone%2048b6d688a4124e99b86bf1ffac96c85f/giphy.mp4)
    
- Automatically converting **address** **to** **coordinates** using Geocoding API.
- **CRUD** functionality for all places: any user can create a new place, owner can delete or update his/her place.
- **Authentication** & **Authorization**: This app uses client's browser local storage for storing JWT tokens which expire after 1 hour. This means that application can auto-login & auto-logout the user, depending on when the token was issued.

![Untitled](AirBnb%20Clone%2048b6d688a4124e99b86bf1ffac96c85f/Untitled%2011.png)

- **Integration with Stripe** to accept payments, listen to payment confirmations on the back-end using a webhook and fulfilling orders upon confirmations.
- **Error handling** throughout the application, on the front-end as well as back-end to deal with corner cases.
- Working with many **API’s** like **Google Maps** API, **Geocoding** API and **SendGrid** API to provide best user experience.

## Tech Stack

### Frontend:

1. React (Create-React-App) for state management & making API requests to the backend.
2. CSS, Bootstrap 5 & Chakra UI for styling.

### Backend

1. NodeJS as a Javascript runtime
2. Express as a framework to easily handle routes & middlewares.
3. JWT tokens for authentication & authorization.
4. MongoDB as a database.

### API’s

1. Google Maps API for map overlays.
2. Google Geocoding API for generating coordinates from address input.
3. Stripe checkout for handling payments.
4. SendGrid for sending emails to customers.

### Deployment

1. Firebase hosting for the front-end React application
2. Heroku deployment for the back-end app. 

<aside>
⚠️ Note: because of Heroku free-plan deployment, all static images are stored in Heroku for only 30 minutes, after which they are deleted.

</aside>

## Github Repo Link

[https://github.com/itsKarad/MERN](https://github.com/itsKarad/MERN)
