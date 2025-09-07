import { useState, useRef } from "react";
import { Routes, Route, useNavigate } from "react-router-dom";
import "./App.css";
import monuments from "./data/monuments.json";

function App() {
  return (
    <div className="min-h-screen flex flex-col">
      {/* Define Routes */}
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/search" element={<SearchPage />} />
      </Routes>

      {/* Footer stays common */}
      <footer className="bg-indigo-700 text-white text-center p-3">
        © {new Date().getFullYear()} The Gems of India 
      </footer>
    </div>
  );
}

/* ---------------- Home Page ---------------- */
function Home() {
  const [search, setSearch] = useState("");
  const navigate = useNavigate();

  // Section refs
  const sectionRefs = useRef({
    home: null,
    about: null,
    location: null,
  });

  // Scroll to section
  const scrollToSection = (section) => {
    sectionRefs.current[section]?.scrollIntoView({
      behavior: "smooth",
      block: "start",
    });
  };

  const handleSearch = () => {
    if (!search.trim()) return;
    navigate(`/search?q=${encodeURIComponent(search)}`); // go to /search page
  };

  return (
    <>
      {/* Header */}
      <header className="bg-blue-700 text-white p-4 flex justify-between items-center shadow-lg sticky top-0 z-50">
        <div className="flex items-center gap-3">
          <img
            src="https://upload.wikimedia.org/wikipedia/en/4/41/Flag_of_India.svg"
            alt="Indian Flag"
            className="h-9 w-auto object-cover rounded-sm shadow self-center"
          />
          <h1 className="text-2xl font-bold flex items-center">
            The Gems of India
          </h1>
        </div>

        {/* Navigation */}
        <nav className="flex gap-6 font-semibold">
          <button
            onClick={() => scrollToSection("home")}
            className="hover:text-gray-300 transition"
          >
            Home
          </button>
          <button
            onClick={() => scrollToSection("about")}
            className="hover:text-gray-300 transition"
          >
            About
          </button>
          <button
            onClick={() => scrollToSection("location")}
            className="hover:text-gray-300 transition"
          >
            Location
          </button>
        

        {/* Search */}
        <div className="flex gap-2">
          <input
            type="text"
            placeholder="Search monuments..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="p-2 rounded-md text-white bg-black w-64 placeholder-gray-300"
          />
          <button
            onClick={handleSearch}
            className="bg-white text-blue-700 px-3 py-2 rounded-md font-semibold hover:bg-gray-200"
          >
            Search
          </button>
        </div>
        </nav>
      </header>

      {/* Main content */}
      <main className="flex-1 p-6 bg-gray-50 space-y-16">
        {/* Home Section */}
        <section ref={(el) => (sectionRefs.current.home = el)}>
          <h2 className="text-2xl font-bold text-blue-700 mb-4">Monuments</h2>
          <div className="flex gap-6 overflow-x-auto pb-4 justify-center">
            {monuments.map((mon, i) => (
              <div
                key={i}
                className="min-w-[250px] bg-white rounded-lg shadow-lg p-4 transform transition hover:scale-105"
              >
                <img
                  src={mon.image}
                  alt={mon.name}
                  className="h-40 w-full object-cover rounded-md mb-3"
                />
                <h3 className="text-lg font-bold text-indigo-700">
                  {mon.name}
                </h3>
                <p className="text-gray-600">{mon.location}</p>
              </div>
            ))}
          </div>
        </section>

        {/* About Section */}
        <section ref={(el) => (sectionRefs.current.about = el)} className="flex flex-col items-center text-center">
          <h2 className="text-2xl font-bold text-blue-700 mb-4">About</h2>
          <p className="text-gray-700 leading-relaxed ">
            The Gems of India website is an interactive platform that showcases India’s most famous monuments and their rich cultural heritage.
            <br />
            With this website, you can:
            <br />
            1.Explore a collection of monuments with images and key details.
            <br />
            2.Search for any monument and instantly get information from Wikipedia.
            <br />
            3.View the exact location of monuments on an interactive Google Map.
            <br />
            4.Navigate easily between Home, About, and Location sections with smooth scrolling.
            <br />
            5.Open links to read more about monuments on external sources.
            <br />
            6.This website is designed to help users learn, explore, and appreciate India’s heritage in a simple and engaging way.
          </p>
        </section>
        <section ref={(el) => (sectionRefs.current.location = el)}>
          <h2 className="text-2xl font-bold text-blue-700 mb-4">Locations</h2>
          <div className="grid md:grid-cols-2 gap-6">
            {monuments.map((mon, i) => (
              <div
                key={i}
                className="bg-white rounded-lg shadow-md p-4 hover:shadow-lg"
              >
                <h3 className="text-lg font-semibold text-indigo-700">
                  {mon.name}
                </h3>
                <p className="text-gray-600 mb-2">{mon.location}</p>
                <iframe
                  title={mon.name}
                  src={`https://www.google.com/maps?q=${encodeURIComponent(
                    mon.location
                  )}&output=embed`}
                  width="100%"
                  height="200"
                  style={{ border: 0 }}
                  allowFullScreen=""
                  loading="lazy"
                  className="rounded"
                ></iframe>
              </div>
            ))}
          </div>
        </section>
      </main>
    </>
  );
}

/* ---------------- Search Page ---------------- */
function SearchPage() {
  const [wikiData, setWikiData] = useState(null);
  const [error, setError] = useState("");
  const query = new URLSearchParams(window.location.search).get("q");

  // Fetch data on load
  useState(() => {
    const fetchData = async () => {
      if (!query) return;
      try {
        const res = await fetch(
          `https://en.wikipedia.org/api/rest_v1/page/summary/${encodeURIComponent(
            query
          )}`
        );
        if (!res.ok) throw new Error("Not found");
        const data = await res.json();
        setWikiData(data);
        setError("");
      } catch (err) {
  const errorMessage = err instanceof Error ? err.message : String(err);
  console.error("Wikipedia fetch error:", errorMessage);
  setWikiData(null);
  setError("No information found online.");
}

    };
    fetchData();
  }, [query]);

  return (
    <main className="flex-1 p-6 bg-gray-50">
      {wikiData && (
  <div className="bg-white shadow-md rounded-lg p-6 mb-4 border text-center">
    <h2 className="text-2xl font-bold text-blue-700">{wikiData.title}</h2>

    {/* Image */}
    {wikiData.thumbnail && (
      <img
        src={wikiData.thumbnail.source}
        alt={wikiData.title}
        className="w-80 mx-auto mt-4 rounded shadow"
      />
    )}

    {/* Description */}
    <p className="text-gray-700 mt-4 leading-relaxed max-w-2xl mx-auto">
      {wikiData.extract}
    </p>

    {/* If description available */}
    {wikiData.description && (
      <p className="text-gray-600 italic mt-2">
        {wikiData.description}
      </p>
    )}

    {/* Google Maps Embed */}
    <div className="mt-6">
      <h3 className="text-xl font-semibold text-indigo-700 mb-2">
        Location on Map
      </h3>
      <iframe
        title={wikiData.title}
        src={`https://www.google.com/maps?q=${encodeURIComponent(
          wikiData.title
        )}&output=embed`}
        width="100%"
        height="300"
        style={{ border: 0 }}
        allowFullScreen=""
        loading="lazy"
        className="rounded shadow-md"
      ></iframe>
    </div>

    {/* Wikipedia Link */}
    <a
      href={wikiData.content_urls.desktop.page}
      target="_blank"
      rel="noreferrer"
      className="text-indigo-600 underline block mt-4"
    >
      Read more on Wikipedia
    </a>
  </div>
)}


      {error && <p className="text-red-500">{error}</p>}
    </main>
  );
}

export default App;
