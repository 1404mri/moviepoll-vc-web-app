"use client";

import { useActionState } from "react";
import { updatePollStatus, type ActionState } from "@/app/actions";

type AdminControlsProps = {
  isClosed: boolean;
};

const initialState: ActionState = {
  ok: false,
  message: ""
};

export function AdminControls({ isClosed }: AdminControlsProps) {
  const [state, formAction, isPending] = useActionState(updatePollStatus, initialState);

  return (
    <form className="form" action={formAction}>
      <label className="label">
        Admin password
        <input
          className="input"
          name="password"
          placeholder="Enter ADMIN_PASSWORD"
          required
          type="password"
        />
      </label>

      <div className="admin-actions">
        <button
          className="button danger"
          disabled={isPending || isClosed}
          name="status"
          type="submit"
          value="closed"
        >
          Close poll
        </button>
        <button
          className="button secondary"
          disabled={isPending || !isClosed}
          name="status"
          type="submit"
          value="open"
        >
          Reopen poll
        </button>
      </div>

      {state.message ? <p className={`message ${state.ok ? "" : "error"}`}>{state.message}</p> : null}
    </form>
  );
}
