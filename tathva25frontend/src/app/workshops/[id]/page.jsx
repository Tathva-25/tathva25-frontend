import CardDetails from "@/components/CardDetails";
import { notFound } from "next/navigation";

export const dynamic = "force-dynamic";

  console.log(process.env.NEXT_PUBLIC_API)


async function getCompetition(id) {
  
  const url = `${process.env.NEXT_PUBLIC_API}/api/events/details/${id}`;
  console.log(url)

  try {
    const res = await fetch(url, { cache: "no-store" });
    if (!res.ok) return null;
    const data = await res.json();
    return data?.event ?? null;
  } catch (e) {
    return null;
  }
}

const formatDate = (dateString) =>
  dateString
    ? new Date(dateString).toLocaleDateString("en-IN", {
        day: "numeric",
        month: "long",
        year: "numeric",
        timeZone: "Asia/Kolkata",
      })
    : "TBA";

const formatTime = (timeString) => {
  if (!timeString) return "TBA";
  const date = new Date(timeString);
  return date.toLocaleTimeString("en-IN", {
    hour: "numeric",
    minute: "2-digit",
    hour12: true,
    timeZone: "Asia/Kolkata",
  });
};

export default async function Page({ params }) {
  const { id } = params || {};
  if (!id) notFound();

  const comp = await getCompetition(id);
  if (!comp) notFound();

  const src = comp.picture || "/images/card_01.png";
  const alt = comp.heading || "Competition";
  const title = comp.heading || "Competition";
  const tagline = comp.description || comp.subheading || "";
  const date = formatDate(comp.datetime);
  const time = formatTime(comp.datetime);
  const desc = comp.catchyPara || "No description available.";
  const venue = comp?.venue?.name ? `${comp.venue.name}` : "TBA";
  const price =
    typeof comp.price === "number"
      ? Math.round(comp.price / 100)
      : comp.price || 0;

  return (
    <div className="flex justify-center min-h-screen items-center p-4 sm:p-0">
      <CardDetails
        id={id}
        src={src}
        alt={alt}
        title={title}
        tagline={tagline}
        date={date}
        time={time}
        desc={desc}
        venue={venue}
        price={price}
      />
    </div>
  );
}
