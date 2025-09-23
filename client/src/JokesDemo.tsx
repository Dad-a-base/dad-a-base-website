// client/src/JokeDemo.tsx
import { useEffect, useState } from "react";

type Joke = {
  id?: string;
  text: string;
  source: string;
};

export default function JokeDemo() {
  const [jokes, setJokes] = useState<Joke[]>([]);
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);
  const [postStatus, setPostStatus] = useState<string | null>(null);

  async function fetchJokes() {
    setLoading(true);
    setError(null);
    try {
      const res = await fetch("/api/jokes", {
        headers: { "Content-Type": "application/json" },
      });
      if (!res.ok) throw new Error(`GET /api/jokes failed: ${res.status}`);

      // Type the JSON you expect:
      const data: unknown = await res.json();
      // Minimal runtime guard:
      const arr = Array.isArray(data) ? (data as Joke[]) : [];
      setJokes(arr);
    } catch (err) {
      setError(err instanceof Error ? err.message : String(err));
    } finally {
      setLoading(false);
    }
  }

  async function postSampleJoke() {
    setPostStatus("Posting...");
    setError(null);
    try {
      const res = await fetch("/api/joke", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          joke: {
            text: "How do you catch a tame rabbit? Tame way!",
            source: "Randall Jarvis",
          },
        }),
      });
      if (res.status === 400) {
        const body = await res.text();
        throw new Error(`Bad Request (400): ${body}`);
      }
      if (!res.ok) throw new Error(`POST /api/joke failed: ${res.status}`);

      const created: Joke = await res.json();
      setPostStatus(`Created joke with id: ${created.id ?? "<no id>"}`);
      fetchJokes();
    } catch (err) {
      setPostStatus(null);
      setError(err instanceof Error ? err.message : String(err));
    }
  }

  useEffect(() => {
    fetchJokes();
  }, []);

  return (
    <div style={{ fontFamily: "system-ui, -apple-system, Segoe UI, Roboto, sans-serif", padding: 16 }}>
      <h2>Jokes Demo (TypeScript)</h2>

      <div style={{ marginBottom: 12 }}>
        <button onClick={fetchJokes}>Reload Jokes</button>{" "}
        <button onClick={postSampleJoke} style={{ marginLeft: 8 }}>
          Post Sample Joke
        </button>
      </div>

      {loading && <div>Loading jokes…</div>}
      {postStatus && <div>{postStatus}</div>}
      {error && <div style={{ color: "crimson", whiteSpace: "pre-wrap" }}>{error}</div>}

      <div style={{ marginTop: 8 }}>
        <h3>Fetched Jokes (raw)</h3>
        <pre
          style={{
            background: "#f5f5f5",
            border: "1px solid #e5e5e5",
            padding: 12,
            overflowX: "auto",
            maxHeight: 320,
          }}
        >
          {JSON.stringify(jokes, null, 2)}
        </pre>

        <ul>
          {jokes.map((j) => (
            <li key={j.id ?? j.text}>
              <strong>{j.id ?? "(no-id)"}</strong>: {j.text} — <em>{j.source}</em>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}
