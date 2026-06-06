import { RankingForm } from "@/components/RankingForm";
import { getBallotByVoterId, getBallots, getPollSettings } from "@/lib/db";
import { movies } from "@/lib/movies";
import { computeRankedPairs } from "@/lib/ranked-pairs";
import { getVoterId } from "@/lib/voter-cookie";

export const dynamic = "force-dynamic";

export default async function Home() {
  const [settings, ballots, voterId] = await Promise.all([
    getPollSettings(),
    getBallots(),
    getVoterId()
  ]);
  const currentBallot = voterId ? await getBallotByVoterId(voterId) : null;
  const result = settings.isClosed ? computeRankedPairs(ballots) : null;
  const movieById = new Map<string, (typeof movies)[number]>(movies.map((movie) => [movie.id, movie]));

  return (
    <main className="shell compact-shell">
      <section className="panel card">
        <p className="eyebrow">{settings.isClosed ? "Final results" : "Movie ranking"}</p>
          {settings.isClosed && result ? (
            <>
              <h2>Final ranking</h2>
              {ballots.length === 0 ? (
                <p className="muted">No ballots were submitted before the poll closed.</p>
              ) : (
                <ol className="result-groups">
                  {result.groups.map((group, index) => (
                    <li className="result-group" key={group.join("-")}>
                      <span className="result-rank">#{index + 1}</span>
                      <span className="result-movies">
                        {group.map((movieId) => {
                          const movie = movieById.get(movieId);

                          if (!movie) {
                            return null;
                          }

                          return (
                            <span className="result-movie-card" key={movieId}>
                              {movie.thumbnailUrl ? (
                                <img
                                  className="result-thumbnail"
                                  src={movie.thumbnailUrl}
                                  alt={`${movie.title} poster`}
                                />
                              ) : null}
                              <span>
                                <strong>{movie.title}</strong>
                                <span className="movie-meta">
                                  {[movie.year, movie.director].filter(Boolean).join(" · ")}
                                </span>
                              </span>
                            </span>
                          );
                        })}
                        {group.length > 1 ? <span className="muted">Tied group</span> : null}
                      </span>
                    </li>
                  ))}
                </ol>
              )}
            </>
          ) : (
            <RankingForm
              initialDisplayName={currentBallot?.displayName ?? ""}
              initialRanking={currentBallot?.ranking ?? []}
              movies={movies}
            />
          )}
      </section>
    </main>
  );
}
