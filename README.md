# Movie CLI

A command-line application built with Node.js that allows users to search for movies using The Movie Database (TMDb) API.

## Features

- Search movies by title
- Interactive movie selection using Inquirer
- Display movie details:
  - Title
  - Release date
  - Rating
  - Runtime
  - Genres
  - Overview
- Environment variable support with dotenv

## Technologies

- Node.js
- TMDb API
- Inquirer
- Dotenv

## Installation

Clone the repository:

```bash
git clone <repository-url>
cd movie-cli
```

Install dependencies:

```bash
npm install
```

Create a `.env` file:

```env
TMDB_API_KEY=your_api_key_here
```

## Usage

Search for a movie:

```bash
node index.js avatar
```

Example output:

```txt
✔ Choose a movie: Avatar (2009-12-16)

=== Details ===

🎬 Title: Avatar
📅 Release date: 2009-12-16
⭐ Score: 7.6/10
⏱ Runtime: 2h 42min
🎭 Genres: Science Fiction, Action, Adventure
🗒️ Summary: In the 22nd century...
```
## License

MIT
