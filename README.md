# Group Trip Planner

A collaborative web application for planning group trips with integrated Google Maps support.

## Features

- **User Authentication**: Register and login with Firebase Authentication
- **Trip Management**: Create, edit, and manage group trips
- **Interactive Maps**: Integrated Google Maps for location selection and route planning
- **Destination Planning**: Add and organize trip destinations
- **Responsive Design**: Works seamlessly on desktop and mobile devices

## Tech Stack

- **Frontend**: React 18 with Vite
- **Authentication**: Firebase Auth
- **Database**: Cloud Firestore
- **Maps**: Google Maps JavaScript API & Places API
- **Routing**: React Router v6
- **Styling**: CSS3 with CSS Variables

## Prerequisites

- Node.js 16+ and npm
- Firebase project with Authentication and Firestore enabled
- Google Maps API key with Maps JavaScript API and Places API enabled

## Setup Instructions

1. **Clone the repository**
   ```bash
   git clone <repository-url>
   cd group-trip-planner
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Configure environment variables**

   Copy `.env.example` to `.env` and fill in your credentials:
   ```bash
   cp .env.example .env
   ```

   Update the following values in `.env`:
   - `VITE_FIREBASE_API_KEY`: Your Firebase API key
   - `VITE_FIREBASE_AUTH_DOMAIN`: Your Firebase auth domain
   - `VITE_FIREBASE_PROJECT_ID`: Your Firebase project ID
   - `VITE_FIREBASE_STORAGE_BUCKET`: Your Firebase storage bucket
   - `VITE_FIREBASE_MESSAGING_SENDER_ID`: Your Firebase messaging sender ID
   - `VITE_FIREBASE_APP_ID`: Your Firebase app ID
   - `VITE_GOOGLE_MAPS_API_KEY`: Your Google Maps API key

4. **Run the development server**
   ```bash
   npm run dev
   ```

   The application will be available at `http://localhost:3000`

## Building for Production

```bash
npm run build
```

The production-ready files will be in the `dist` directory.

## Project Structure

```
group-trip-planner/
├── src/
│   ├── components/
│   │   ├── auth/          # Authentication components
│   │   ├── trips/         # Trip management components
│   │   ├── maps/          # Google Maps components
│   │   └── common/        # Shared components
│   ├── contexts/          # React contexts
│   ├── services/          # Firebase services
│   ├── styles/            # CSS files
│   ├── App.jsx            # Main app component
│   └── main.jsx           # Entry point
├── public/                # Static assets
├── .env.example           # Environment variables template
├── vite.config.js         # Vite configuration
└── package.json           # Dependencies
```

## Features Overview

### Authentication
- User registration with email and password
- Login and logout functionality
- Profile management
- Protected routes for authenticated users

### Trip Management
- Create new trips with details (name, dates, budget, etc.)
- View all trips in a dashboard
- Edit trip information
- Delete trips
- Add and remove destinations

### Google Maps Integration
- Interactive map display
- Location search with autocomplete
- Multiple destination markers
- Route planning and directions
- Map visualization of trip itinerary

## Security Notes

- Never commit `.env` file to version control
- Keep your Firebase and Google Maps API keys secure
- Configure Firebase security rules appropriately
- Enable domain restrictions for Google Maps API key

## License

MIT

## Contributing

Contributions are welcome! Please open an issue or submit a pull request.
