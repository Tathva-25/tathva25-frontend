import Link from "next/link";

// /src/app/workshops/page.jsx

export const metadata = {
  title: "Workshops — Tathva 25",
  description: "Explore upcoming workshops for Tathva 25",
};

export default function WorkshopsPage() {
  const workshops = [
    { id: "w1", title: "Intro to Robotics", desc: "Hands-on robotics basics." },
    { id: "w2", title: "Web Dev Crash Course", desc: "Build modern web apps." },
  ];

  return (
    <main
      style={{
        padding: "2rem",
        fontFamily: 'system-ui, -apple-system, "Segoe UI", Roboto',
      }}
    >
      <header>
        <h1>Workshops</h1>
        <p>Upcoming workshops and registrations for Tathva 25.</p>
      </header>

      <section>
        <ul style={{ listStyle: "none", padding: 0 }}>
          {workshops.map((w) => (
            <li
              key={w.id}
              style={{
                margin: "1.25rem 0",
                border: "1px solid #e5e7eb",
                borderRadius: 8,
                padding: "1rem",
              }}
            >
              <h2 style={{ margin: 0 }}>{w.title}</h2>
              <p style={{ margin: "0.5rem 0" }}>{w.desc}</p>
              <Link href={`/workshops/${w.id}`}>
                <a style={{ color: "#2563eb" }}>View details</a>
              </Link>
            </li>
          ))}
        </ul>
      </section>
    </main>
  );
}
