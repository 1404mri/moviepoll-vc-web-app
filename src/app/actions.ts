"use server";

import { revalidatePath } from "next/cache";
import {
  findBallotByDisplayName,
  getPollSettings,
  setPollClosed,
  upsertBallot
} from "@/lib/db";
import { getRequiredEnv } from "@/lib/env";
import { validateRanking } from "@/lib/movies";
import { getOrCreateVoterId } from "@/lib/voter-cookie";

export type ActionState = {
  ok: boolean;
  message: string;
};

const successState = (message: string): ActionState => ({ ok: true, message });
const errorState = (message: string): ActionState => ({ ok: false, message });

function normalizeDisplayName(value: FormDataEntryValue | null) {
  return String(value ?? "").trim().replace(/\s+/g, " ");
}

export async function saveBallot(_previousState: ActionState, formData: FormData) {
  const settings = await getPollSettings();

  if (settings.isClosed) {
    return errorState("The poll is closed, so ballots can no longer be changed.");
  }

  const displayName = normalizeDisplayName(formData.get("displayName"));
  const ranking = formData.getAll("ranking").map(String);

  if (displayName.length < 2 || displayName.length > 80) {
    return errorState("Use a display name between 2 and 80 characters.");
  }

  if (!validateRanking(ranking)) {
    return errorState("Rank every movie exactly once before saving.");
  }

  const voterId = await getOrCreateVoterId();
  const existingNameBallot = await findBallotByDisplayName(displayName);

  if (existingNameBallot && existingNameBallot.voterId !== voterId) {
    return errorState("That display name has already submitted a ballot.");
  }

  await upsertBallot(voterId, displayName, ranking);
  revalidatePath("/");

  return successState("Your ranking is saved. You can come back on this browser to edit it.");
}

export async function updatePollStatus(_previousState: ActionState, formData: FormData) {
  const password = String(formData.get("password") ?? "");
  const desiredStatus = String(formData.get("status")) === "closed";

  if (password !== getRequiredEnv("ADMIN_PASSWORD")) {
    return errorState("Admin password is incorrect.");
  }

  await setPollClosed(desiredStatus);
  revalidatePath("/");
  revalidatePath("/admin");

  return successState(desiredStatus ? "Poll closed. Results are now public." : "Poll reopened.");
}
