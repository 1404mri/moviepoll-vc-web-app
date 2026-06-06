export type Movie = {
  id: string;
  title: string;
  year?: number;
  director?: string;
  runtimeMinutes?: number;
  description?: string;
  infoUrl?: string;
  trailerUrl?: string;
  thumbnailUrl?: string;
};

// Edit this list before sharing the poll. If you change it after ballots exist, reset the ballots first.
export const movies = [
  {
    id: "wicked",
    title: "Wicked",
    year: 2024,
    director: "Jon M. Chu",
    runtimeMinutes: 160,
    description: "The story of Elphaba and Glinda before the events of The Wizard of Oz.",
    infoUrl: "https://www.themoviedb.org/movie/402431",
    trailerUrl: "https://www.youtube.com/watch?v=6COmYeLsz4c",
    thumbnailUrl: "https://image.tmdb.org/t/p/w342/c5Tqxeo1UpBvnAc3csUm7j3hlQl.jpg"
  },
  {
    id: "michael",
    title: "Michael",
    year: 2026,
    director: "Antoine Fuqua",
    runtimeMinutes: 150,
    description: "A biographical drama chronicling the life and career of Michael Jackson.",
    infoUrl: "https://www.themoviedb.org/movie/1087388-michael",
    trailerUrl: "https://www.youtube.com/watch?v=3zOLzsbOleM",
    thumbnailUrl: "https://upload.wikimedia.org/wikipedia/en/thumb/3/37/Michael_%282026_film_poster%29.png/250px-Michael_%282026_film_poster%29.png"
  },
  {
    id: "project-hail-mary",
    title: "Project Hail Mary",
    year: 2026,
    director: "Phil Lord & Christopher Miller",
    runtimeMinutes: 140,
    description: "A lone astronaut wakes up far from Earth with the fate of humanity in his hands.",
    infoUrl: "https://www.themoviedb.org/movie/950387",
    trailerUrl: "https://www.youtube.com/watch?v=m08TxIsFTRI",
    thumbnailUrl: "https://theknockturnal.com/wp-content/uploads/2026/02/611288-project-hail-mary-0-230-0-345-crop.jpg"
  }
] as const satisfies readonly Movie[];
export const movieIds = movies.map((movie) => movie.id);

export const allmovies = [
  {
    id: "obsession",
    title: "Obsession",
    year: 2026,
    director: "Curry Barker",
    runtimeMinutes: 108,
    description: "After using a supernatural wish to win over his crush, a young man discovers that some desires come with terrifying consequences.",
    infoUrl: "https://www.themoviedb.org/search?query=Obsession%202026",
    trailerUrl: "https://www.youtube.com/watch?v=gMC8kkwbIQQ",
    thumbnailUrl: "https://upload.wikimedia.org/wikipedia/en/thumb/0/05/Obsession_theatrical_poster.jpeg/250px-Obsession_theatrical_poster.jpeg"
  },
  {
    id: "backrooms",
    title: "Backrooms",
    year: 2026,
    director: "Kane Parsons",
    runtimeMinutes: 102,
    description: "A strange doorway leads into a vast liminal dimension filled with unsettling mysteries and horrors.",
    infoUrl: "https://www.themoviedb.org/movie/1388366-backrooms",
    trailerUrl: "https://www.youtube.com/watch?v=0HjdiohVOik",
    thumbnailUrl: "https://upload.wikimedia.org/wikipedia/en/thumb/3/3d/Backrooms_%28film%29_poster.jpg/250px-Backrooms_%28film%29_poster.jpg"
  },
  {
    id: "my-little-pony-friendship-is-magic",
    title: "My Little Pony: Friendship Is Magic",
    year: 2010,
    director: "Lauren Faust",
    runtimeMinutes: 22,
    description: "Twilight Sparkle learns the value of friendship with her friends in Equestria.",
    infoUrl: "https://www.themoviedb.org/tv/33765",
    trailerUrl: "https://www.youtube.com/@FriendshipIsMagicOfficial",
    thumbnailUrl: "https://m.media-amazon.com/images/M/MV5BZjhkNzBmMDAtMTBiNy00NGIxLThlN2EtMTJlZDEzZjIzYWUyXkEyXkFqcGc@._V1_FMjpg_UX1000_.jpg"
  },
  {
    id: "it",
    title: "IT",
    year: 2017,
    director: "Andy Muschietti",
    runtimeMinutes: 135,
    description: "A group of kids confronts the terrifying Pennywise in the town of Derry.",
    infoUrl: "https://www.themoviedb.org/movie/346364",
    trailerUrl: "https://www.youtube.com/watch?v=xKJmEC5ieOk",
    thumbnailUrl: "https://image.tmdb.org/t/p/w342/9E2y5Q7WlCVNEhP5GiVTjhEhx1o.jpg"
  },
  {
    id: "avatar-the-last-airbender",
    title: "The Legend of Aang: The Last Airbender",
    year: 2024,
    director: "Albert Kim",
    runtimeMinutes: 50,
    description: "Aang embarks on a journey to master the four elements and restore balance.",
    infoUrl: "https://www.themoviedb.org/tv/82452",
    trailerUrl: "",
    thumbnailUrl: "https://miscrave.com/wp-content/uploads/2026/04/Legend-of-Aang-Avatar-Movie.jpg"
  },
  {
    id: "wicked",
    title: "Wicked",
    year: 2024,
    director: "Jon M. Chu",
    runtimeMinutes: 160,
    description: "The story of Elphaba and Glinda before the events of The Wizard of Oz.",
    infoUrl: "https://www.themoviedb.org/movie/402431",
    trailerUrl: "https://www.youtube.com/watch?v=6COmYeLsz4c",
    thumbnailUrl: "https://image.tmdb.org/t/p/w342/c5Tqxeo1UpBvnAc3csUm7j3hlQl.jpg"
  },
  {
    id: "a-silent-voice",
    title: "A Silent Voice",
    year: 2016,
    director: "Naoko Yamada",
    runtimeMinutes: 130,
    description: "A moving story of redemption, friendship, and overcoming past mistakes.",
    infoUrl: "https://www.themoviedb.org/movie/378064",
    trailerUrl: "https://www.youtube.com/watch?v=nfK6UgLra7g",
    thumbnailUrl: "https://image.tmdb.org/t/p/w342/tuFaWiqX0TXoWu7DGNcmX3UW7sT.jpg"
  },
  {
    id: "josee-the-tiger-and-the-fish",
    title: "Josee, the Tiger and the Fish",
    year: 2020,
    director: "Kotaro Tamura",
    runtimeMinutes: 98,
    description: "A heartfelt romance between a student and a young woman chasing her dreams.",
    infoUrl: "https://www.themoviedb.org/movie/652837",
    trailerUrl: "https://www.youtube.com/watch?v=w6IsHL91aXo",
    thumbnailUrl: "https://image.tmdb.org/t/p/w342/xAbSLi61npWyVs5M0yxin3dKcGO.jpg"
  },
  {
    id: "michael",
    title: "Michael",
    year: 2026,
    director: "Antoine Fuqua",
    runtimeMinutes: 150,
    description: "A biographical drama chronicling the life and career of Michael Jackson.",
    infoUrl: "https://www.themoviedb.org/movie/1087388-michael",
    trailerUrl: "https://www.youtube.com/watch?v=3zOLzsbOleM",
    thumbnailUrl: "https://upload.wikimedia.org/wikipedia/en/thumb/3/37/Michael_%282026_film_poster%29.png/250px-Michael_%282026_film_poster%29.png"
  },
  {
    id: "project-hail-mary",
    title: "Project Hail Mary",
    year: 2026,
    director: "Phil Lord & Christopher Miller",
    runtimeMinutes: 140,
    description: "A lone astronaut wakes up far from Earth with the fate of humanity in his hands.",
    infoUrl: "https://www.themoviedb.org/movie/950387",
    trailerUrl: "https://www.youtube.com/watch?v=m08TxIsFTRI",
    thumbnailUrl: "https://theknockturnal.com/wp-content/uploads/2026/02/611288-project-hail-mary-0-230-0-345-crop.jpg"
  },
  {
    id: "f1",
    title: "F1",
    year: 2025,
    director: "Joseph Kosinski",
    runtimeMinutes: 155,
    description: "A veteran Formula One driver returns to mentor a rising star.",
    infoUrl: "https://www.themoviedb.org/movie/911430",
    trailerUrl: "https://www.youtube.com/watch?v=CT2_P2DZBR0",
    thumbnailUrl: "https://upload.wikimedia.org/wikipedia/en/3/38/F1_%282025_film%29.png"
  },
  {
    id: "john-wick",
    title: "John Wick",
    year: 2014,
    director: "Chad Stahelski",
    runtimeMinutes: 101,
    description: "A retired assassin returns to the underworld in pursuit of vengeance.",
    infoUrl: "https://www.themoviedb.org/movie/245891",
    trailerUrl: "https://www.youtube.com/watch?v=2AUmvWm5ZDQ",
    thumbnailUrl: "https://image.tmdb.org/t/p/w342/fZPSd91yGE9fCcCe6OoQr6E3Bev.jpg"
  },
  {
    id: "john-wick-chapter-2",
    title: "John Wick: Chapter 2",
    year: 2017,
    director: "Chad Stahelski",
    runtimeMinutes: 122,
    description: "John Wick is forced back into service by a powerful crime lord.",
    infoUrl: "https://www.themoviedb.org/movie/324552",
    trailerUrl: "https://www.youtube.com/watch?v=XGk2EfbD_Ps",
    thumbnailUrl: "https://image.tmdb.org/t/p/w342/hXWBc0ioZP3cN4zCu6SN3YHXZVO.jpg"
  },
  {
    id: "john-wick-chapter-3",
    title: "John Wick: Chapter 3 - Parabellum",
    year: 2019,
    director: "Chad Stahelski",
    runtimeMinutes: 131,
    description: "John Wick fights for survival after becoming the target of assassins worldwide.",
    infoUrl: "https://www.themoviedb.org/movie/458156",
    trailerUrl: "https://www.youtube.com/watch?v=M7XM597XO94",
    thumbnailUrl: "https://image.tmdb.org/t/p/w342/ziEuG1essDuWuC5lpWUaw1uXY2O.jpg"
  },
  {
    id: "john-wick-chapter-4",
    title: "John Wick: Chapter 4",
    year: 2023,
    director: "Chad Stahelski",
    runtimeMinutes: 169,
    description: "John Wick faces the High Table in a final battle for freedom.",
    infoUrl: "https://www.themoviedb.org/movie/603692",
    trailerUrl: "https://www.youtube.com/watch?v=qEVUtrk8_B4",
    thumbnailUrl: "https://image.tmdb.org/t/p/w342/vZloFAK7NmvMGKE7VkF5UHaz0I.jpg"
  },
  {
    id: "spider-man-into-the-spider-verse",
    title: "Spider-Man: Into the Spider-Verse",
    year: 2018,
    director: "Bob Persichetti, Peter Ramsey, Rodney Rothman",
    runtimeMinutes: 117,
    description: "Miles Morales becomes Spider-Man and discovers a multiverse of heroes.",
    infoUrl: "https://www.themoviedb.org/movie/324857",
    trailerUrl: "https://www.youtube.com/watch?v=g4Hbz2jLxvQ",
    thumbnailUrl: "https://image.tmdb.org/t/p/w342/iiZZdoQBEYBv6id8su7ImL0oCbD.jpg"
  },
  {
    id: "spider-man-across-the-spider-verse",
    title: "Spider-Man: Across the Spider-Verse",
    year: 2023,
    director: "Joaquim Dos Santos, Kemp Powers, Justin K. Thompson",
    runtimeMinutes: 140,
    description: "Miles Morales journeys across the Spider-Verse and encounters new allies and enemies.",
    infoUrl: "https://www.themoviedb.org/movie/569094",
    trailerUrl: "https://www.youtube.com/watch?v=cqGjhVJWtEg",
    thumbnailUrl: "https://image.tmdb.org/t/p/w342/8Vt6mWEReuy4Of61Lnj5Xj704m8.jpg"
  }
];

export function getMovieTitle(movieId: string) {
  return movies.find((movie) => movie.id === movieId)?.title ?? movieId;
}

export function validateRanking(ranking: string[]) {
  if (ranking.length !== movieIds.length) {
    return false;
  }

  const submittedIds = new Set(ranking);
  return movieIds.every((movieId) => submittedIds.has(movieId));
}
