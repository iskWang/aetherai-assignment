import { getDateString } from "./getDateString";
import { describe, it, expect } from "vitest";

describe("getDateString", () => {
  it("should return same date string", () => {
    const testString = "2024-01-01 12:12:12";
    const date = new Date(testString);

    expect(getDateString(date)).toEqual(testString);
  });
});
