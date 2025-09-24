import React, { useEffect, useMemo, useRef, useState } from "react";

type Joke = { id: string; text: string };
// ↓ Put these near your other utils
const SAMPLE_JOKES = [
  "I only know 25 letters of the alphabet. I don’t know y.",
  "I used to be a baker, then I kneaded dough.",
  "I’m reading a book about anti-gravity. It’s impossible to put down.",
  "Why did the scarecrow get promoted? He was outstanding in his field.",
  "I’d tell you a construction joke, but I’m still working on it.",
];

function addMockId() {
  // works in all browsers without types complaints
  return (crypto as any)?.randomUUID?.() ?? `${Date.now()}-${Math.random()}`;
}

// utils
const rand = (min: number, max: number) =>
  Math.floor(Math.random() * (max - min + 1)) + min;

// Accept string[], { jokes: [...] }, or array of objects { id/_id, text/joke }
function normalizeJokes(payload: any): Joke[] {
  const list: any[] = Array.isArray(payload)
    ? payload
    : payload?.jokes ?? payload?.data ?? [];

  return list
    .map((j, i) => {
      if (typeof j === "string") return { id: `${Date.now()}-${i}`, text: j };
      const text = j?.text ?? j?.joke ?? "";
      const id = j?.id ?? j?._id ?? `${Date.now()}-${i}`;
      return { id, text };
    })
    .filter((j) => j.text && String(j.text).trim().length);
}

function decorateAsBubbles(jokes: Joke[]) {
  return jokes.map((j) => ({
    ...j,
    size: rand(90, 160),
    left: rand(0, 85),
    duration: rand(14, 28),
    delay: rand(0, 14),
    hue: rand(180, 360),
  }));
}

const Board: React.FC = () => {
  const [jokes, setJokes] = useState<Joke[]>([]);
  const [loading, setLoading] = useState(false);
  const [posting, setPosting] = useState(false);
  const [error, setError] = useState<string>("");

  const [newJoke, setNewJoke] = useState("");
  const mounted = useRef(true);

  const bubbles = useMemo(() => decorateAsBubbles(jokes), [jokes]);

  async function fetchJokes() {
    setLoading(true);
    setError("");
    try {
      const res = await fetch("/api/jokes", { headers: { Accept: "application/json" } });
      if (!res.ok) throw new Error(`GET /api/jokes failed: ${res.status}`);
      const data = await res.json();
      if (mounted.current) setJokes(normalizeJokes(data));
    } catch (e: any) {
      console.error("API failed, loading sample data:", e)
      if (mounted.current) {
         setJokes(normalizeJokes(SAMPLE_JOKES));
         setError(` API unavailable (${e?.message}), showing sample data`);
      }
    } finally {
      if (mounted.current) setLoading(false);
    }
  }
  function loadSampleSet() {
  setJokes(normalizeJokes(SAMPLE_JOKES));
}

function addMockBubble(text?: string) {
  const pick =
    text ?? SAMPLE_JOKES[Math.floor(Math.random() * SAMPLE_JOKES.length)];
  setJokes((prev) => [...prev, { id: addMockId(), text: pick }]);
}
  useEffect(() => {
    mounted.current = true;
    fetchJokes();
    return () => {
      mounted.current = false;
    };
  }, []);

  async function submitJoke(e: React.FormEvent) {
    e.preventDefault();
    if (!newJoke.trim()) return;
    setPosting(true);
    setError("");
    try {
      const res = await fetch("/api/joke", {
        method: "POST",
        headers: { "Content-Type": "application/json", Accept: "application/json" },
        body: JSON.stringify({ joke: {text: newJoke.trim(), source: "aaron"} }),
      });
      if (!res.ok) throw new Error(`POST /api/joke failed: ${res.status}`);
      setNewJoke("");
      await fetchJokes(); // re-fetch to show the new joke
    } catch (e: any) {
      setError(e?.message ?? "Failed to submit joke");
    } finally {
      setPosting(false);
    }
  }

  return (
    <div className="board-root">
      <div className="container">
        <div className="header">
          <div className="title">Dad-A-Base</div>
          <button className="btn" onClick={fetchJokes} disabled={loading}>
            {loading ? "Refreshing…" : "Refresh"}
          </button>
            <button className="btn" onClick={loadSampleSet}>Load sample</button>
        </div>

        <div className="grid">
          {/* LEFT: bubble wall (GET /api/joke) */}
          <section className="wall" aria-label="Jokes bubble wall">

            {bubbles.length === 0 && !loading && (
              <div className="empty">No jokes yet — be the first! 😄</div>
            )}

            {bubbles.map((b) => (
              <div
                key={b.id + b.text}
                className="bubble"
                title={b.text}
                style={{
                  left: `${b.left}%`,
                  width: `${b.size}px`,
                  height: `${b.size}px`,
                  background: `hsl(${b.hue} 80% 55% / 0.28)`,
                  animationDuration: `${b.duration}s`,
                  animationDelay: `${b.delay}s`,
                }}
              >
                <span>{b.text.length > 90 ? b.text.slice(0, 87) + "…" : b.text}</span>
              </div>
            ))}
          </section>

          {/* RIGHT: submit form (POST /api/joke) */}
          <section className="panel">
            <h2 style={{ margin: 0, fontSize: 18, fontWeight: 600 }}>Tell us a new joke</h2>
            <form onSubmit={submitJoke}>
              <textarea
                rows={5}
                value={newJoke}
                onChange={(e) => setNewJoke(e.target.value)}
                placeholder="Tell us your best (or worst) dad joke…"
              />
              <div className="row">
                <button type="submit" className="submit" disabled={posting || !newJoke.trim()}>
                  {posting ? "Submitting…" : "Submit"}
                </button>
              </div>
              {error && <div className="error">{error}</div>}
            </form>
          </section>
        </div>
      </div>
    </div>
  );
};

export default Board;
