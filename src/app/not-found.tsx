import Link from "next/link";

export default function NotFound() {
  return (
    <main className="not-found">
      <p className="not-found-code">404</p>
      <h1>This field report is missing.</h1>
      <p>The page may be deferred until reliable game information is available.</p>
      <Link className="button-link" href="/en/">
        Return home
      </Link>
    </main>
  );
}
