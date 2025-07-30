export const fetchUsersByQuery = async (query) => {
  const url = `https://api.github.com/search/users?q=${encodeURIComponent(query)}`;

  const response = await fetch(url);

  if (!response.ok) {
    throw new Error("Failed to fetch GitHub users");
  }

  return await response.json();
};
