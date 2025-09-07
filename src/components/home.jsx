import monuments from "../data/monuments.json";

function Home() {
  return (
    <section id="home" className="p-6 bg-gray-50 min-h-screen">
      <h2 className="text-2xl font-bold text-center mb-6">Explore Famous Monuments</h2>
      <div className="flex space-x-6 overflow-x-scroll scrollbar-hide p-4">
        {monuments.map((mon, index) => (
          <div
            key={index}
            className="min-w-[250px] bg-white rounded-lg shadow-md hover:shadow-lg transition p-4"
          >
            <img
              src={mon.image}
              alt={mon.name}
              className="h-48 w-full object-cover rounded-md"
            />
            <h3 className="text-lg font-semibold mt-2">{mon.name}</h3>
          </div>
        ))}
      </div>
    </section>
  );
}

export default Home;
