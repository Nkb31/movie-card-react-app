# Movie Card

A React application that allows users to discover and browse popular movies using the TMDB (The Movie Database) API. Built with React, Vite, React Router, and Tailwind CSS.

## Features

- Browse popular movies
- Search for movies by title
- Add movies to favorites
- Responsive design with Tailwind CSS
- Fast development with Vite and SWC

## Prerequisites

- Node.js (v14 or higher)
- npm or yarn
- TMDB API Key (get one for free at [themoviedb.org](https://www.themoviedb.org/settings/api))

## Getting Started

### Installation

1. Clone the repository:
```bash
git clone https://github.com/yourusername/movie-card.git
cd movie-card
```

2. Install dependencies:
```bash
npm install
```

3. Set up environment variables:
```bash
cp .env.example .env
```
Then update the `.env` file with your TMDB API key:
```
VITE_TMDB_API_KEY=your_api_key_here
```

### Development

Start the development server:
```bash
npm run dev
```

The application will be available at `http://localhost:5173`

### Build

Build for production:
```bash
npm run build
```

### Preview

Preview the production build:
```bash
npm run preview
```

### Lint

Run ESLint to check code quality:
```bash
npm run lint
```

## Project Structure

```
src/
├── components/       # Reusable React components
├── contexts/         # React Context providers
├── pages/            # Page components
├── service/          # API service functions
├── css/              # Stylesheets
├── assets/           # Static assets
├── App.jsx           # Main App component
└── main.jsx          # Entry point
```

## Technologies

- **React 19** - UI library
- **Vite** - Build tool and dev server
- **React Router** - Client-side routing
- **Tailwind CSS** - Utility-first CSS framework
- **SWC** - Fast JavaScript compiler

## API

This project uses the [TMDB API](https://www.themoviedb.org/settings/api) to fetch movie data.

## Contributing

Feel free to submit issues and pull requests.

## License

This project is open source and available under the MIT License.
