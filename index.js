#!/usr/bin/env node
import { select } from "@inquirer/prompts";
import dotenv from "dotenv";
import { spawn } from "child_process";
dotenv.config({ quiet: true });

const apiKey = process.env.TMDB_API_KEY;
if (!apiKey) {
    console.error("❌ TMDB_API_KEY not found.");
    process.exit(1);
}
async function searchMovies(movie) {
    const url = `https://api.themoviedb.org/3/search/movie?api_key=${apiKey}&query=${movie}`;
    const response = await fetch(url);
    const data = await response.json();
    return data.results || [];
}
async function getMovieDetails(id) {
    const url = `https://api.themoviedb.org/3/movie/${id}?api_key=${apiKey}`;

    const response = await fetch(url);
    const data = await response.json();
    return data;
}
async function getMovieVideos(id) {
    const url = `https://api.themoviedb.org/3/movie/${id}/videos?api_key=${apiKey}`;

    const response = await fetch(url);
    const data = await response.json();
    return data.results || [];
}
function formatRuntime(min){
    const hours = Math.floor( min / 60);
    const minutes = min % 60;

    if(hours === 0) return `${minutes}min`;
    if(minutes === 0) return `${hours}h`;
    return `${hours}h ${minutes}min`;
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
    const choices = results.slice(0, 5).map((m =>({
        name: `${m.title} (${m.release_date || "Unknown"})`,
        value: m.id
    })));
    const selectedMovie = await select({
    message: "Escolha um filme:",
    choices
    });
    const action = await select({
        message: "What do you want to do?",
        choices: [
            {
                name: "View details",
                value: "details"
            },
            {
                name: "Watch trailer",
                value: "trailer"
            }
        ]
    });
    if(action === "details"){
        const movieData = await getMovieDetails(selectedMovie);
    
        console.log("\n=== Details ===\n");
        console.log("🎬 Title:", movieData.title);
        console.log("📅 Release date:", movieData.release_date);
        console.log("⭐ Score:", movieData.vote_average ? movieData.vote_average.toFixed(1) + "/10": "N/A");
        console.log("⏱ Runtime:", formatRuntime(movieData.runtime));
        console.log(
            "🎭 Genres:", movieData.genres.map(g => g.name).join(", ")
        );
        console.log("🗒️ Summary:", movieData.overview || "No summary available.");
        console.log("\n");

    }
    if(action === "trailer"){
        const videos = await getMovieVideos(selectedMovie);
        const trailer = videos.find(
            video =>
                video.site === "YouTube" &&
                video.type === "Trailer" &&
                video.official
        );
        if(!trailer){
            console.log("🎥 No trailer available.");
            return;
        }
        const trailerUrl = 
            `https://www.youtube.com/watch?v=${trailer.key}`;
        console.log("🎥 Opening trailer...");
        
        spawn("mpv", [trailerUrl], {
            detached: true,
            stdio: "ignore"
        }).unref();
    }
}
main();
