import { computeRankedPairs } from "./lib/ranked-pairs";

type Movie = {
  id: string;
  title: string;
};

type Ballot = {
  ranking: string[];
};

type TestCase = {
  name: string;
  movies: Movie[];
  ballots: Ballot[];
  expectedGroups: string[][];
  expectedRejected?: [string, string][];
};

function edgeExists(
  locked: any[],
  winner: string,
  loser: string
): boolean {
  return locked.some(
    (e) => e.winner === winner && e.loser === loser
  );
}

function normalizeGroups(groups: string[][]): string[][] {
  return groups.map((g) => [...g].sort());
}

function groupsEqual(
  actual: string[][],
  expected: string[][]
): boolean {
  return (
    JSON.stringify(normalizeGroups(actual)) ===
    JSON.stringify(normalizeGroups(expected))
  );
}

function runTest(test: TestCase): boolean {
  console.log(`\n========================================`);
  console.log(`TEST: ${test.name}`);
  console.log(`========================================`);

  const result = computeRankedPairs(
    test.ballots,
    test.movies
  );

  let passed = true;

  if (!groupsEqual(result.groups, test.expectedGroups)) {
    console.error("❌ Groups mismatch");
    console.error(
      "Expected:",
      JSON.stringify(test.expectedGroups)
    );
    console.error(
      "Actual:",
      JSON.stringify(result.groups)
    );
    passed = false;
  }

  for (const [winner, loser] of test.expectedRejected ?? []) {
    if (edgeExists(result.locked, winner, loser)) {
      console.error(
        `❌ Edge ${winner}->${loser} should have been rejected`
      );
      passed = false;
    }
  }

  if (passed) {
    console.log("✅ PASS");
  } else {
    console.log("❌ FAIL");
    console.log(
      JSON.stringify(result, null, 2)
    );
  }

  return passed;
}


const moviesABC: Movie[] = [
  { id: "A", title: "Movie A" },
  { id: "B", title: "Movie B" },
  { id: "C", title: "Movie C" },
];

const moviesABCD: Movie[] = [
  { id: "A", title: "Movie A" },
  { id: "B", title: "Movie B" },
  { id: "C", title: "Movie C" },
  { id: "D", title: "Movie D" },
];

const moviesABCDE: Movie[] = [
  { id: "A", title: "Movie A" },
  { id: "B", title: "Movie B" },
  { id: "C", title: "Movie C" },
  { id: "D", title: "Movie D" },
  { id: "E", title: "Movie E" },
];

const moviesABCDEF: Movie[] = [
  { id: "A", title: "Movie A" },
  { id: "B", title: "Movie B" },
  { id: "C", title: "Movie C" },
  { id: "D", title: "Movie D" },
  { id: "E", title: "Movie E" },
  { id: "F", title: "Movie F" },
];

const moviesABCShuffled: Movie[] = [
  { id: "C", title: "Movie C" },
  { id: "A", title: "Movie A" },
  { id: "B", title: "Movie B" },
];

const tests: TestCase[] = [
    {
  name: "B Condorcet Winner",
  movies: moviesABC,
  ballots: [
    { ranking: ["B", "A", "C"] },
    { ranking: ["B", "A", "C"] },
    { ranking: ["B", "A", "C"] },

    { ranking: ["B", "C", "A"] },
    { ranking: ["B", "C", "A"] },

    { ranking: ["A", "C", "B"] },
  ],
  expectedGroups: [["B"], ["A"], ["C"]],
},

{
  name: "C Condorcet Winner",
  movies: moviesABC,
  ballots: [
    { ranking: ["C", "A", "B"] },
    { ranking: ["C", "A", "B"] },
    { ranking: ["C", "A", "B"] },

    { ranking: ["C", "B", "A"] },
    { ranking: ["C", "B", "A"] },

    { ranking: ["A", "B", "C"] },
  ],
  expectedGroups: [["C"], ["A"], ["B"]],
},

{
  name: "D Condorcet Winner",
  movies: moviesABCD,
  ballots: [
    { ranking: ["D", "A", "B", "C"] },
    { ranking: ["D", "A", "B", "C"] },
    { ranking: ["D", "A", "B", "C"] },

    { ranking: ["D", "B", "C", "A"] },
    { ranking: ["D", "B", "C", "A"] },

    { ranking: ["A", "B", "C", "D"] },
  ],
  expectedGroups: [["D"], ["A"], ["B"], ["C"]],
},

{
  name: "E Condorcet Winner",
  movies: moviesABCDE,
  ballots: [
    { ranking: ["E", "A", "B", "C", "D"] },
    { ranking: ["E", "A", "B", "C", "D"] },
    { ranking: ["E", "A", "B", "C", "D"] },

    { ranking: ["E", "D", "C", "B", "A"] },
    { ranking: ["E", "D", "C", "B", "A"] },

    { ranking: ["A", "B", "C", "D", "E"] },
  ],
  expectedGroups: [["E"], ["A"], ["B"], ["C"], ["D"]],
},

{
  name: "F Condorcet Winner",
  movies: moviesABCDEF,
  ballots: [
    { ranking: ["F", "A", "B", "C", "D", "E"] },
    { ranking: ["F", "A", "B", "C", "D", "E"] },
    { ranking: ["F", "A", "B", "C", "D", "E"] },

    { ranking: ["F", "E", "D", "C", "B", "A"] },
    { ranking: ["F", "E", "D", "C", "B", "A"] },

    { ranking: ["A", "B", "C", "D", "E", "F"] },
  ],
  expectedGroups: [["F"], ["A"], ["B"], ["C"], ["D"], ["E"]],
},
{
  name: "Candidate Order Independence",
  movies: moviesABCShuffled,
  ballots: [
    { ranking: ["B", "A", "C"] },
    { ranking: ["B", "A", "C"] },
    { ranking: ["B", "A", "C"] },

    { ranking: ["B", "C", "A"] },
    { ranking: ["B", "C", "A"] },

    { ranking: ["A", "C", "B"] },
  ],
  expectedGroups: [["B"], ["A"], ["C"]],
},
];
let passed = 0;

for (const test of tests) {
  if (runTest(test)) {
    passed++;
  }
}

console.log("\n========================================");
console.log(`RESULT: ${passed}/${tests.length} TESTS PASSED`);
console.log("========================================");

if (passed !== tests.length) {
  process.exit(1);
}