This is a [Next.js](https://nextjs.org/) project bootstrapped with [`create-next-app`](https://github.com/vercel/next.js/tree/canary/packages/create-next-app).

## Getting Started

To Run the Project, clone this Repository and install node_modules by following bellow commands.
```bash
npm clone --branch Frontend https://github.com/25mohit/upforce.git
# THEN ->
npm install
# THEN START PROJECT LOCALLY
npm run dev
```

Deployed Link - FrontEnd [https://upforce.netlify.app/](https://upforce.netlify.app/).
Deployed Link - Backend [https://github.com/25mohit/upforce/tree/Backend](https://github.com/25mohit/upforce/tree/Backend).

## How to Use the Project?

1. You Need to Register with your email and password.
2. After Registering you can login with your credentials.
3. After Login, you can Add Event (fields - Event Name, Description, Date, Status).
4. A Table view with pagination for your added Events.
5. You can search your events in Seach Field by typing Event Name, you can sort events on Name, CreatedAt and Status basics.
6. You can View, Edit and Delete your Events.
7. A Statistics section where you can see total numbers of your events in Active, Inactive and Canceled basics.
8. A 'Cancel' event option will appear while editing a event, in status dropdown. 

## Requirements i Covered in this Assignment

1. Frontend : I have used Next.js and TailwindCSS.
2. Backend : I have used Express.js, MongoDB, Node.js.
3. Authentication : JWT, providing while login, and verify it every time user uses Dashboard Page.
4. Pages : User Page - Where user can Register and Login.
5. Event Dashboard : Displayed a Paginated list of Events sorted by Created Date.
6. Functionality to Add, Edit, Delete the events and user can only see events added by themself.
7. Search Functionality - Where user can search there added events by Events Names.
8. Filter Functionality - A Filter Dropdown, where user can filter Events.

## EXTRA FEATURES

1. Redux and Redux-Toolkit Integration for Proper state management and for API Integration/ Consumption.
2. Toast Notification - Notification integrated in Every API, whever user integrated with an API, a Notification will popup. Exp- While Registering, Login, Adding Events, Updating Events, Deleting Events.
3. Loading Animation every time a API is calling, and Loading auto off when API returns response.
4. Debouncing in Search bar of, for better Performance and reduce API Invoking multiple times.
5. Events Statistics - User can see there added events status. There are 3 status Active, Pending, Cancelled.
6. Sorting Events Feature.