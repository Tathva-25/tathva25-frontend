import Card from "../../components/Card"

const page = () => {
  return (
    <div className="flex justify-center h-screen items-center">
        <Card
            src="/images/sculptor.png"
            title="Sculpting Modeling"
            tagline="Mastering and Simulation and Modeling"
            date="17 October 2025"
            time="9 AM"
            venue="ELHC, NIT"
            price={999}
        />
    </div>
  )
}

export default page