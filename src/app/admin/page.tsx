import Link from "next/link";
import { AdminControls } from "@/components/AdminControls";
import { countBallots, getPollSettings } from "@/lib/db";

export const dynamic = "force-dynamic";

export default async function AdminPage() {
  const [settings, ballotCount] = await Promise.all([getPollSettings(), countBallots()]);

  return (
    <main className="shell">
      <section className="hero">
        <div className="panel hero-copy">
          <p className="eyebrow">Admin</p>
          <h1>Control the poll.</h1>
          <p className="lede">
            Close the poll to publish final Ranked Pairs results, or reopen it to let friends edit
            and submit ballots again.
          </p>
        </div>
        <div className="panel stats">
          <div className="stat">
            <strong>{settings.isClosed ? "Closed" : "Open"}</strong>
            <span>poll status</span>
          </div>
          <div className="stat">
            <strong>{ballotCount}</strong>
            <span>{ballotCount === 1 ? "ballot saved" : "ballots saved"}</span>
          </div>
          <Link className="button secondary" href="/">
            View public page
          </Link>
        </div>
      </section>

      <section className="panel card">
        <h2>Close or reopen</h2>
        <AdminControls isClosed={settings.isClosed} />
      </section>
    </main>
  );
}
