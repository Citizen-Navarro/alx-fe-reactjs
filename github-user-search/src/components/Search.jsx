import { useState } from "react";
import fetchUserData from "../services/githubService";

const Search = () => {
  const [username, setUsername] = useState("");
  const [userData, setUserData] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleInputChange = (e) => {
    setUsername(e.target.value);
  };

  const handleFormSubmit = async (e) => {
    e.preventDefault();

    if (!username.trim()) return;

    setLoading(true);
    setError("");
    setUserData(null);

    try {
      const data = await fetchUserData(username);
      setUserData(data);
    } catch (err) {
      setError("Looks like we cant find the user");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="search-container">
      <form onSubmit={handleFormSubmit} className="search-form">
        <input
          type="text"
          placeholder="Enter GitHub username"
          value={username}
          onChange={handleInputChange}
          className="search-input"
        />
        <button type="submit" className="search-button">
          Search
        </button>
      </form>

      <div className="results">
        {loading && <p>Loading...</p>}
        {error && <p>{error}</p>}
        {userData && (
          <div className="user-card">
            <img
              src={userData.avatar_url}
              alt={`${userData.login}'s avatar`}
              className="avatar"
            />
            <h2>{userData.name || userData.login}</h2>
            <a
              href={userData.html_url}
              target="_blank"
              rel="noopener noreferrer"
            >
              View GitHub Profile
            </a>
          </div>
        )}
      </div>
    </div>
  );
};

export default Search;
