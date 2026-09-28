import User from "./User.js";
import {isLeapYear} from "./date-functions.js";
// import fs from "node:fs";
import {readFile, appendFile, writeFile, unlink} from "node:fs/promises";
import {join, resolve} from "node:path";

// console.log(isLeapYear(2026));

// fs.readFile("./src/sallaries.json", (error, data)=> {
//     console.log(error);
//     console.log(data);
//     // fs.writeFile()
// })

// readFile("./src/sallaries.json")
//     .then(data => console.log(data))
//     .catch(error => console.log(error));

// const sallariesPath = join(process.cwd(), "src", "sallaries.json");
const sallariesPath = resolve("src", "sallaries.json");
// console.log(sallariesPath);
// console.log(process.cwd());

// const buffer = await readFile(sallariesPath);
// const text = buffer.toString();
// console.log(text);
// const sallaries = JSON.parse(await readFile(sallariesPath, "utf-8"));
// console.log(sallaries);
// await appendFile(sallariesPath, "1000");
// await writeFile(sallariesPath, JSON.stringify([1000]));
// sallaries.push(1000);
// await writeFile(sallariesPath, JSON.stringify(sallaries, null, 2));
// await appendFile("src/file.txt", "Some text");
// await writeFile("src/file2.txt", "Some text");
await unlink("src/file2.txt");