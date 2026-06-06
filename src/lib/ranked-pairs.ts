import { movies, type Movie } from "@/lib/movies";

export type RankedPairsBallot = {
  ranking: string[];
};

export type PairwiseVictory = {
  winner: string;
  loser: string;
  wins: number;
  losses: number;
  margin: number;
};

export type RankedPairsResult = {
  groups: string[][];
  victories: PairwiseVictory[];
  locked: PairwiseVictory[];
};

function movieOrder(movieList: readonly Movie[]) {
  return new Map(movieList.map((movie, index) => [movie.id, index]));
}

function ballotRanks(ballot: RankedPairsBallot) {
  return new Map(ballot.ranking.map((movieId, index) => [movieId, index]));
}

function createsCycle(graph: Map<string, Set<string>>, winner: string, loser: string) {
  const stack = [winner];
  const seen = new Set<string>();

  while (stack.length > 0) {
    const current = stack.pop();

    if (!current || seen.has(current)) {
      continue;
    }

    if (current === loser) {
      return true;
    }

    seen.add(current);
    stack.push(...(graph.get(current) ?? []));
  }

  return false;
}

function reachableFrom(graph: Map<string, Set<string>>, start: string) {
  const seen = new Set<string>();
  const stack = [...(graph.get(start) ?? [])];

  while (stack.length > 0) {
    const current = stack.pop();

    if (!current || seen.has(current)) {
      continue;
    }

    seen.add(current);
    stack.push(...(graph.get(current) ?? []));
  }

  return seen;
}

export function computeRankedPairs(
  ballots: RankedPairsBallot[],
  movieList: readonly Movie[] = movies
): RankedPairsResult {
  const ids = movieList.map((movie) => movie.id);
  const order = movieOrder(movieList);
  const ranks = ballots.map(ballotRanks);
  const victories: PairwiseVictory[] = [];

  for (let firstIndex = 0; firstIndex < ids.length; firstIndex += 1) {
    for (let secondIndex = firstIndex + 1; secondIndex < ids.length; secondIndex += 1) {
      const first = ids[firstIndex];
      const second = ids[secondIndex];
      let firstWins = 0;
      let secondWins = 0;

      for (const rank of ranks) {
        const firstRank = rank.get(first) ?? Number.POSITIVE_INFINITY;
        const secondRank = rank.get(second) ?? Number.POSITIVE_INFINITY;

        if (firstRank < secondRank) {
          firstWins += 1;
        } else if (secondRank < firstRank) {
          secondWins += 1;
        }
      }

      if (firstWins === secondWins) {
        continue;
      }

      const firstBeatsSecond = firstWins > secondWins;
      victories.push({
        winner: firstBeatsSecond ? first : second,
        loser: firstBeatsSecond ? second : first,
        wins: Math.max(firstWins, secondWins),
        losses: Math.min(firstWins, secondWins),
        margin: Math.abs(firstWins - secondWins)
      });
    }
  }

  victories.sort((left, right) => {
    if (right.wins !== left.wins) {
      return right.wins - left.wins;
    }

    if (right.margin !== left.margin) {
      return right.margin - left.margin;
    }

    const leftWinnerOrder = order.get(left.winner) ?? 0;
    const rightWinnerOrder = order.get(right.winner) ?? 0;

    if (leftWinnerOrder !== rightWinnerOrder) {
      return leftWinnerOrder - rightWinnerOrder;
    }

    return (order.get(left.loser) ?? 0) - (order.get(right.loser) ?? 0);
  });

  const graph = new Map(ids.map((movieId) => [movieId, new Set<string>()]));
  const locked: PairwiseVictory[] = [];

  for (const victory of victories) {
    graph.get(victory.loser)?.add(victory.winner);

    if (createsCycle(graph, victory.winner, victory.loser)) {
      graph.get(victory.loser)?.delete(victory.winner);
      continue;
    }

    locked.push(victory);
  }

  const grouped = ids.map((movieId) => ({
    movieId,
    beatenBy: reachableFrom(graph, movieId).size
  }));

  grouped.sort((left, right) => {
    if (left.beatenBy !== right.beatenBy) {
      return left.beatenBy - right.beatenBy;
    }

    return (order.get(left.movieId) ?? 0) - (order.get(right.movieId) ?? 0);
  });

  const groups = grouped.reduce<string[][]>((rankGroups, item) => {
    const lastGroup = rankGroups.at(-1);
    const lastMovie = lastGroup?.[0];
    const lastBeatenBy = lastMovie
      ? grouped.find((candidate) => candidate.movieId === lastMovie)?.beatenBy
      : undefined;

    if (lastGroup && lastBeatenBy === item.beatenBy) {
      lastGroup.push(item.movieId);
    } else {
      rankGroups.push([item.movieId]);
    }

    return rankGroups;
  }, []);

  return { groups, victories, locked };
}
