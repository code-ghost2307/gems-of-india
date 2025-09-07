// SearchResult.jsx
import { useLocation } from "react-router-dom";

function SearchResult() {
  const location = useLocation();
  const wikiData = location.state?.wikiData;
  const error = location.state?.error;

  return (
    <div className="p-6 bg-gray-50 min-h-screen">
      {wikiData ? (
        <div className="bg-white shadow-md rounded-lg p-6 mb-4 border">
          <h2 className="text-2xl font-bold text-blue-700">{wikiData.title}</h2>
          {wikiData.thumbnail && (
            <img
              src={wikiData.thumbnail.source}
              alt={wikiData.title}
              className="w-64 mt-4 rounded shadow"
            />
          )}
          <p className="text-gray-600 mt-2">{wikiData.extract}</p>
          <a
            href={wikiData.content_urls.desktop.page}
            target="_blank"
            rel="noreferrer"
            className="text-indigo-600 underline block mt-3"
          >
            Read more on Wikipedia
          </a>
        </div>
      ) : (
        <p className="text-red-500">{error || "No data found."}</p>
      )}
    </div>
  );
}

export default SearchResult;
