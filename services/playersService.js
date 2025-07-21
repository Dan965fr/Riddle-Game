

const BASE_URL = "http://localhost:3007/players";

// Get all players
export async function getAllPlayers() {
  const res = await fetch(BASE_URL);
  return await res.json();
}

// Get player by id
export async function getPlayerById(id) {
  const res = await fetch(`${BASE_URL}/${id}`);
  if (!res.ok) return null;
  return await res.json();
}

// Add new player
export async function addPlayer(playerObj) {
  const res = await fetch(BASE_URL, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify( playerObj )
  });
  if(!res.ok){
    const err = await res.json();
    throw new Error(err.error || "faild to add player")
  }
  return await res.json();
}


// Update player's best time
export async function updatePlayerTime(id, time) {
  try {
    console.log(" שולח עדכון זמן לשרת:", { id, time });

    const res = await fetch(`${BASE_URL}/${id}`, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({lowestTime: time })
    });

    console.log(" סטטוס תגובה מהשרת",res.status)
    const data = await res.json();

    if(!res.ok){
      throw new Error(data.error || "faild to apdate")
    }
    console.log(" תגובה מהשרת:", data);

    return data;
  } catch (err) {
    console.error(" שגיאה בביצוע fetch:", err);
    throw err; 
  }
}
