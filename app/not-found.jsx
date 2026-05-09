import Link from "next/link";

export default function NotFound() {
  return (
    <main className="not-found">
      <p className="kicker">Archive Notice</p>
      <h1>Page not printed.</h1>
      <Link href="/" className="mag-target">Return to the Gazette</Link>
    </main>
  );
}
