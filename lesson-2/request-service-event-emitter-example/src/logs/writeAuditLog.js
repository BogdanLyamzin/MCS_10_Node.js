import {readFile, appendFile} from "node:fs/promises";
import {resolve} from "node:path";

const logsPath = resolve("src", "data", "logs.json");

const writeAuditLog = async (request, operation)=> {
    const message = `${new Date().toISOString()} ${operation} ${request.id}\n`;
    await appendFile(logsPath, message);
}

export default writeAuditLog;