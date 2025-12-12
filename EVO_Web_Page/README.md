# EVO Web Version

This directory contains the web build output for the EVO Event Organizer app.

## Features

The web version includes all core features from the mobile app:
- View and browse events
- Filter events by category, location, and date
- Add new events
- User authentication and profiles (including Google Sign-In)
- Map view of events
- Calendar view

## Platform Limitations

Due to web platform constraints, the following features are not available:
- **Event Scanning from Photos**: Image cropping and ML Kit text recognition are not supported on web browsers
- **Calendar Integration**: Direct calendar integration is not available, but users can note event details manually
- **Native Geolocation**: Uses HTML5 Geolocation API instead of native GPS

## Authentication

Google Sign-In is configured for web with the OAuth client ID embedded in `index.html`. The configuration uses:
- Client ID: `526109648317-bqb15itr59a5c6i4kjm0lsgob0r5os9e.apps.googleusercontent.com`
- Redirect URI: Supabase callback URL

## Building

To build the web version:

```bash
# From the project root
./scripts/build_web_production.sh

# Or manually from the evo directory
cd evo
flutter build web --release \
  --dart-define=APP_ENV=production \
  --dart-define=SUPABASE_URL='...' \
  --dart-define=SUPABASE_ANON_KEY='...'
```

## Deployment

The web app is automatically deployed to GitHub Pages via GitHub Actions on every push to the main branch.

## Development

For local development:

```bash
cd evo
flutter run -d chrome
```

