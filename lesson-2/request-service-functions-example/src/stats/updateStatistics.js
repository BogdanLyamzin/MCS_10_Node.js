import {readFile, writeFile} from "node:fs/promises";
import {resolve} from "node:path";

const statsPath = resolve("src", "data", "stats.json");

const updateStatistics = async(operation)=> {
    const stats = JSON.parse(await readFile(statsPath, "utf-8"));
    stats[operation] += 1;
    await writeFile(statsPath, JSON.stringify(stats, null, 2));
}

export default updateStatistics;