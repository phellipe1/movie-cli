import { select } from "@inquirer/prompts";
import dotenv from "dotenv";
dotenv.config();

const apiKey = process.env.TMDB_API_KEY;

async function searchMovies(movie) {
    const url = `https://api.themoviedb.org/3/search/movie?api_key=${apiKey}&query=${movie}`;
    const response = await fetch(url);
    const data = await response.json();
    return data.results || [];
}

async function main() {
    const movie = process.argv.slice(2).join(" ");

    if(!movie){
        console.log("Digite o nome de um filme")
        process.exit(1);
    }

    const results = await searchMovies(movie);
    if(results.length === 0){
        console.log("Filme não encontrado");
        return;
    }
    const choices = results.slice(0, 5).map((m, index) =>({
        name: `${m.title} (${m.release_date})`,
        value: m.id
    }));
    const selectedMovie = await select({
    message: "Escolha um filme:",
    choices
    });

    const movieData = results.find(m => m.id === selectedMovie);

    console.log("\n=== Details ===");
    console.log("Title:", movieData.title);
    console.log("Release date:", movieData.release_date);
    console.log("Score:", movieData.vote_average || "N/A");
    console.log("Summary:", movieData.overview);
}
main();