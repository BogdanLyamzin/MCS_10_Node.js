import {readFile} from "node:fs/promises";
import {resolve} from "node:path";
import { createReadStream, createWriteStream } from "node:fs";

import generateFile from "./generate-file.js";

await generateFile({filePath: "./big-access.log", fileLines: 10_000_000});
await generateFile({filePath: "./small-access.log", fileLines: 1_000_000});

// const bigAccessLogsPath = resolve("big-access.log");
// const smallAccessLogsPath = resolve("small-access.log");

// const smallAccessLogs = await readFile(smallAccessLogsPath, "utf-8");
// console.log(smallAccessLogs);
// const bigAccessLogs = await readFile(bigAccessLogsPath, "utf-8");
// console.log(bigAccessLogs);

// const readStream = createReadStream(bigAccessLogsPath, {
//     encoding: "utf-8"
// });

// readStream.on("data", chunk => {
//     console.log(chunk);
//     console.log(`Get chunk: ${chunk.length} symbols`);
// });

// readStream.on("end", ()=> {
//     console.log("Finish read big access logs")
// })

// readStream.on("error", error => {
//     console.log(`Error read big access logs`, error.message)
// })

// const writeStream = createWriteStream("./output.txt");

// const lines = 1_000_000;

// for(let i = 0; i < lines; i+=1) {
//     writeStream.write(`${i} line\n`);
// }

// writeStream.end();

// writeStream.on("finish", ()=> {
//     console.log("Finish write stream");
// })

// writeStream.on("error", ()=> {
//     console.log("error write stream", error.message);
// })

// const readStream = createReadStream(smallAccessLogsPath, {
//     encoding: "utf-8"
// });

// const writeStream = createWriteStream("./small-access-copy.log");

// readStream.on("data", chunk => {
//     writeStream.write(chunk)
// });

// readStream.on("end", ()=> {
//     writeStream.end();
//     console.log("Finish copy small access logs")
// })

// readStream.on("error", error => {
//     console.log(`Error copy small access logs`, error.message)
// })

// readStream.pipe(writeStream);