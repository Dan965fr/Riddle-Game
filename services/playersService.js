

const BASE_URL = "http://localhost:3007/players";

// Get all players
export async function getAllPlayers() {
  const res = await fetch(BASE_URL);
  return await res.json();
}

// Get player by name
export async function getPlayerByName(name) {
  const res = await fetch(`${BASE_URL}/${name}`);
  if (!res.ok) return null;
  return await res.json();
}

// Add new player
export async function addPlayer(name) {
  const res = await fetch(BASE_URL, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ name })
  });
  return await res.json();
}

// Update player's best time
export async function updatePlayerTime(name, time) {
  const res = await fetch(`${BASE_URL}/${name}`, {
    method: "PUT",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ time })
  });
  return await res.json();
}
