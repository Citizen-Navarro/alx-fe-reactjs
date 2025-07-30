import React, { useState } from "react";
import { fetchUsersByQuery } from "../services/githubService";

const Search = () => {
  const [username, setUsername] = useState("");
  const [location, setLocation] = useState("");
  const [minRepos, setMinRepos] = useState("");
  const [results, setResults] = useState([]);
  const [error, setError] = useState("");

  const handleSearch = async (e) => {
    e.preventDefault();

    try {
      const queryParts = [];

      if (username) queryParts.push(`${username} in:login`);
      if (location) queryParts.push(`location:${location}`);
      if (minRepos) queryParts.push(`repos:>=${minRepos}`);

      const query = queryParts.join(" ");
      const data = await fetchUsersByQuery(query);
      setResults(data.items);
      setError("");
    } catch (err) {
      console.error(err);
      setError("Error fetching users. Please try again.");
    }
  };

  return (
    <div className="max-w-4xl mx-auto p-6">
      <form
        onSubmit={handleSearch}
        className="bg-white shadow-md rounded-lg p-6 space-y-4"
      >
        <h2 className="text-xl font-semibold mb-2">GitHub Advanced User Search</h2>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <input
            type="text"
            placeholder="Username"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            className="border rounded px-3 py-2 focus:outline-none focus:ring w-full"
          />

          <input
            type="text"
            placeholder="Location (e.g., Lagos)"
            value={location}
            onChange={(e) => setLocation(e.target.value)}
            className="border rounded px-3 py-2 focus:outline-none focus:ring w-full"
          />

          <input
            type="number"
            placeholder="Min Repositories"
            value={minRepos}
            onChange={(e) => setMinRepos(e.target.value)}
            className="border rounded px-3 py-2 focus:outline-none focus:ring w-full"
          />
        </div>

        <button
          type="submit"
          className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
        >
          Search
        </button>

        {error && <p className="text-red-600 mt-2">{error}</p>}
      </form>

      <div className="mt-6">
        {results.length > 0 && (
          <ul className="space-y-4">
            {results.map((user) => (
              <li key={user.id} className="bg-gray-100 p-4 rounded-lg shadow-sm">
                <div className="flex items-center space-x-4">
                  <img
                    src={user.avatar_url}
                    alt={`${user.login} avatar`}
                    className="w-12 h-12 rounded-full"
                  />
                  <div>
                    <a
                      href={user.html_url}
                      target="_blank"
                      rel="noreferrer"
                      className="text-blue-700 font-semibold"
                    >
                      {user.login}
                    </a>
                    <p className="text-sm text-gray-600">Score: {user.score}</p>
                  </div>
                </div>
              </li>
            ))}
          </ul>
        )}
      </div>
    </div>
  );
};

export default Search;
