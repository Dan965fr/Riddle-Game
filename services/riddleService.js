
const BASE_URL = "http://localhost:3007/riddles";


// GET ALL RIDDLES
export async function getAllRiddles() {
    const res = await fetch(BASE_URL);
    return await res.json();
    
}


// GET riddle by id
export async function getRiddleById(id){
    const res = await fetch(`${BASE_URL}/${id}`);
    return await res.json();
}

// ADD A RIDDDLE
export async function addRiddle(riddleObj){
    const res = await fetch(BASE_URL,{
        method:"POST",
        headers:{"Content-Type":"application/json"},
        body: JSON.stringify(riddleObj)
    });
    return await res.json();
}


// Update a riddle
export async function updateRiddle(riddleObj) {
    const res = await fetch(`${BASE_URL}/${riddleObj.id}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(riddleObj)
    });
    return await res.json();
}

// Delete a riddle
export async function deleteRiddle(id) {
    await fetch(`${BASE_URL}/${id}`, {
        method: "DELETE"
    });
}

