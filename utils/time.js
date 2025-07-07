export function measureTime(callback) {
        const start = Date.now();
        callback();
        const end = Date.now();
        return { start, end };
    }


