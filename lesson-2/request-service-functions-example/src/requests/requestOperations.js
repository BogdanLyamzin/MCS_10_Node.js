import {readFile, writeFile} from "node:fs/promises";
import {resolve} from "node:path";

const requestsPath = resolve("src", "data", "requests.json");

export const getRequests = async ()=> JSON.parse(await readFile(requestsPath, "utf-8"));

export const writeRequests = data => writeFile(requestsPath, JSON.stringify(data, null, 2));