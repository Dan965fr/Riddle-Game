import fs from "fs"

const path = "lib/db.txt"

export function loadRiddles() {
    const raw = fs.readFileSync(path, "utf-8")
    return JSON.parse(raw)
}

export function saveRiddles(data) {
    fs.writeFileSync(path, JSON.stringify(data, null, 2), "utf-8")
}

