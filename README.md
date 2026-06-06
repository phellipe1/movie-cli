# Movie CLI

A command-line application built with Node.js that allows you to search for movies using The Movie Database (TMDb) API.

## Features

* Search movies by title
* Interactive movie selection
* View movie details

  * Title
  * Release date
  * Rating
  * Runtime
  * Genres
  * Director
  * Main cast
  * Overview
* Watch movie trailers using mpv
* Display streaming providers available in Brazil
* Global CLI command support (`mov-cli`)

## Installation

### Clone the repository

```bash
git clone https://github.com/phellipe1/movie-cli.git
cd movie-cli
```

### Install dependencies

```bash
npm install
```

### Configure TMDb API Key

Create a `.env` file in the project root:

```env
TMDB_API_KEY=your_api_key_here
```

You can get an API key from:

https://www.themoviedb.org/settings/api

### Run locally

```bash
node index.js batman
```

## Global Installation

Inside the project folder:

```bash
npm link
```

After that, you can run:

```bash
mov-cli batman
```

from anywhere in your terminal.

## Trailer Support

Movie trailers are played using mpv.

Install mpv before using the trailer feature:

### Arch Linux

```bash
sudo pacman -S mpv
```

### Debian / Ubuntu

```bash
sudo apt install mpv
```

## Example

```bash
mov-cli batman
```

Output:

```text
🎬 Title: Batman Begins
📅 Release date: 2005-06-10
⭐ Score: 7.7/10
⏱ Runtime: 2h 20min
🎭 Genres: Drama, Crime, Action
🎬 Director: Christopher Nolan
🎭 Cast: Christian Bale, Michael Caine, Liam Neeson, Katie Holmes, Gary Oldman
📺 Available on:
   • Netflix
   • HBO Max
🗒 Summary: Driven by tragedy, billionaire Bruce Wayne...
```

## Technologies

* Node.js
* TMDb API
* Inquirer
* dotenv
* mpv

## Future Improvements

* Favorites
* Search history
* Search by actor
* Search by director
* TV series support

## License

MIT
