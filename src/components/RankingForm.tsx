"use client";

import { useActionState, useMemo, useState } from "react";
import { saveBallot, type ActionState } from "@/app/actions";
import type { Movie } from "@/lib/movies";

type RankingFormProps = {
  movies: readonly Movie[];
  initialDisplayName: string;
  initialRanking: string[];
};

const initialState: ActionState = {
  ok: false,
  message: ""
};

export function RankingForm({ movies, initialDisplayName, initialRanking }: RankingFormProps) {
  const [state, formAction, isPending] = useActionState(saveBallot, initialState);
  const fallbackRanking = useMemo(() => movies.map((movie) => movie.id), [movies]);
  const [ranking, setRanking] = useState(initialRanking.length > 0 ? initialRanking : fallbackRanking);

  function move(movieId: string, direction: -1 | 1) {
    setRanking((currentRanking) => {
      const index = currentRanking.indexOf(movieId);
      const nextIndex = index + direction;

      if (index === -1 || nextIndex < 0 || nextIndex >= currentRanking.length) {
        return currentRanking;
      }

      const nextRanking = [...currentRanking];
      [nextRanking[index], nextRanking[nextIndex]] = [nextRanking[nextIndex], nextRanking[index]];
      return nextRanking;
    });
  }

  const movieById = new Map(movies.map((movie) => [movie.id, movie]));

  return (
    <form className="form" action={formAction}>
      <label className="label">
        Your display name
        <input
          className="input"
          name="displayName"
          defaultValue={initialDisplayName}
          maxLength={80}
          minLength={2}
          placeholder="e.g. Sam"
          required
        />
      </label>

      <div>
        <ol className="rank-list">
          {ranking.map((movieId, index) => {
            const movie = movieById.get(movieId);

            if (!movie) {
              return null;
            }

            return (
              <li className="rank-item" key={movie.id}>
                <span className="rank-number">{index + 1}</span>
                {movie.thumbnailUrl ? (
                  <img className="rank-thumbnail" src={movie.thumbnailUrl} alt={`${movie.title} poster`} />
                ) : (
                  <span className="rank-thumbnail placeholder" aria-hidden="true" />
                )}
                <span className="rank-copy">
                  <strong className="rank-title">{movie.title}</strong>
                  <span className="movie-meta">
                    {[movie.year, movie.director, movie.runtimeMinutes ? `${movie.runtimeMinutes} min` : null]
                      .filter(Boolean)
                      .join(" · ")}
                  </span>
                  {movie.description ? <span className="movie-description">{movie.description}</span> : null}
                  <span className="movie-links">
                    {movie.infoUrl ? (
                      <a href={movie.infoUrl} rel="noreferrer" target="_blank">
                        Details
                      </a>
                    ) : null}
                    {movie.trailerUrl ? (
                      <a href={movie.trailerUrl} rel="noreferrer" target="_blank">
                        Trailer
                      </a>
                    ) : null}
                  </span>
                </span>
                <span className="rank-actions">
                  <button
                    aria-label={`Move ${movie.title} up`}
                    className="icon-button"
                    disabled={index === 0 || isPending}
                    onClick={() => move(movie.id, -1)}
                    type="button"
                  >
                    ↑
                  </button>
                  <button
                    aria-label={`Move ${movie.title} down`}
                    className="icon-button"
                    disabled={index === ranking.length - 1 || isPending}
                    onClick={() => move(movie.id, 1)}
                    type="button"
                  >
                    ↓
                  </button>
                </span>
                <input name="ranking" type="hidden" value={movie.id} />
              </li>
            );
          })}
        </ol>
      </div>

      <button className="button" disabled={isPending} type="submit">
        {isPending ? "Saving..." : "Save ranking"}
      </button>

      {state.message ? <p className={`message ${state.ok ? "" : "error"}`}>{state.message}</p> : null}
    </form>
  );
}
