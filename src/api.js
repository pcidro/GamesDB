export async function getPopularGames() {
  const apiKey = import.meta.env.VITE_RAWG_KEY;
  const url = `https://api.rawg.io/api/games?key=${apiKey}&ordering=-added`;

  try {
    const response = await fetch(url);
    const data = await response.json();
    return data.results;
  } catch (error) {
    console.error("Erro ao buscar:", error);
  }
}

export async function searchGames(query) {
  const apiKey = import.meta.env.VITE_RAWG_KEY;
  const url = `https://api.rawg.io/api/games?key=${apiKey}&search=${query}`;
  try {
    const response = await fetch(url);
    const data = await response.json();
    return data.results;
  } catch (error) {
    console.error(error);
  }
}

export async function loadGame(id) {
  const apiKey = import.meta.env.VITE_RAWG_KEY;
  const url = `https://api.rawg.io/api/games/${id}?key=${apiKey}`;
  try {
    const response = await fetch(url);
    const data = await response.json();
    console.log(data);
    return data;
  } catch (error) {
    console.error(error);
  }
}
