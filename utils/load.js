import {readFile,writeFile} from "fs/promises"

const path = "lib/db.txt"

export async function loadRiddles() {
    const raw = await readFile(path, "utf-8");
    return JSON.parse(raw);
}

export async function saveRiddles(data) {
    await writeFile(path, JSON.stringify(data, null, 2), "utf-8");
}

