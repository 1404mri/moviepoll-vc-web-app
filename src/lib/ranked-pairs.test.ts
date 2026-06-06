import { describe, expect, it } from "vitest";
import { computeRankedPairs } from "@/lib/ranked-pairs";

const movieList = [
  { id: "a", title: "A" },
  { id: "b", title: "B" },
  { id: "c", title: "C" }
];

describe("computeRankedPairs", () => {
  it("returns a clear winner order", () => {
    const result = computeRankedPairs(
      [
        { ranking: ["a", "b", "c"] },
        { ranking: ["a", "c", "b"] },
        { ranking: ["b", "a", "c"] }
      ],
      movieList
    );

    expect(result.groups).toEqual([["a"], ["b"], ["c"]]);
  });

  it("skips a lock that would create a cycle", () => {
    const result = computeRankedPairs(
      [
        { ranking: ["a", "b", "c"] },
        { ranking: ["b", "c", "a"] },
        { ranking: ["c", "a", "b"] }
      ],
      movieList
    );

    expect(result.victories).toHaveLength(3);
    expect(result.locked).toHaveLength(2);
  });

  it("shows unresolved ties as rank groups", () => {
    const result = computeRankedPairs(
      [
        { ranking: ["a", "b", "c"] },
        { ranking: ["b", "a", "c"] }
      ],
      movieList
    );

    expect(result.groups).toEqual([["a", "b"], ["c"]]);
  });
});
