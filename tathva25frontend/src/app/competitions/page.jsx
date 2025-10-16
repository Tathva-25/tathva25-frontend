import CardDetails from "@/components/CardDetails"

const page = () => {
  return (
    <div className="flex justify-center h-screen items-center">
        <CardDetails
            src="/images/sculptor.png"
            alt="sculptor"
            title="Sculpting Modeling"
            tagline="Mastering and Simulation and Modeling"
            date="17 October 2025"
            time="9 AM"
            desc="Penguins have knees! They're just hidden under all their feathers and blubber, so it looks like they're just waddling around on tiny legs. But underneath, they've got full little legs with knees bent at about a 45-degree angle at all times."
            venue="ELHC, NIT"
            price={999}
        />
    </div>
  )
}

export default page