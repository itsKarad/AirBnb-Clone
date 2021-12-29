# AirBnb Clone

## URL

[airbnb-karad.web.app](https://airbnb-karad.web.app/)

## Documentation, Demos & Features

[airbnb-karad.web.app/about](https://airbnb-karad.web.app/about)

# 📌 What is it?

It is a simple, full-stack AirBnb clone where users can list their own place for renting out to other users. Other users can also book a particular place and pay using Stripe. 

## 🏝 Each place has a

- Title & thumbnail image
- Overview (number of beds, bedrooms, rent per night)
- A short description
- A list of amenities
- Location
- Owner information
- Google Maps overlay

- Users can view other places and also book them for a given date interval. Users can also pay for the places using Stripe Checkout.
- Users can also view their recent bookings in a table format.

## 🙋🏽‍♂️ Each user has

1. an email
2. a secure password &
3. a profile photo 

## 🗺 Explore Mode!

- Find places on the map from the dropped red pins!

# 🚀 Features

- Re-usable, DRY functional Portal React components used throughout the application used to action confirmations and error messages
- 🌆 **Preview** for uploaded **image**. This component is used many times in the application.
- 🗺 Automatically converting **address** **to** **coordinates** using Google Geocoding API.
- ➕ **CRUD (Create - Read - Update - Delete)** functionality for all places: any user can create a new place, owner can delete or update his/her place.
- 🔐 **Authentication** & **Authorization**: This app uses client's browser local storage for storing JWT tokens which expire after 1 hour. This means that application can auto-login & auto-logout the user, depending on when the token was issued.
- 💰 **Integration with Stripe** to accept payments, listen to payment confirmations on the back-end using a webhook and fulfilling orders upon confirmations.
- ⛔️ **Error handling** throughout the application, on the front-end as well as back-end to deal with corner cases.
- 🌎 Working with many **API’s** like **Google Maps** API, **Geocoding** API and **SendGrid** API to provide best user experience.
- 🎨 App has a r**esponsive design**, which looks good on any screen size. This is how it looks on an iPhone X.
- ✉️ **Integration with** **SendGrid** to send **welcome emails** to users when they sign up.

# 🧑🏻‍💻 Tech Stack

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

If these images are not found, they are automatically replaced by the a black placeholder image

</aside>
