import { EventEmitter } from "node:events";
import { readFile, writeFile } from "node:fs/promises";
import { resolve } from "node:path";

const requestsPath = resolve("src", "data", "requests.json");

export default class RequestService extends EventEmitter {
  async #getRequests() {
    return JSON.parse(await readFile(requestsPath, "utf-8"));
  }

  async #writeRequests(data) {
    writeFile(requestsPath, JSON.stringify(data, null, 2));
  }

  async create(payload) {
    try {
      const requests = await this.#getRequests();
      const newRequest = {
        id: Date.now(),
        status: "new",
        ...payload,
      };
      requests.push(newRequest);
      await this.#writeRequests(requests);
      this.emit("requestCreated", newRequest);
      return newRequest;
    } catch (error) {
      this.emit("error", error);
    }
  }

  async deleteRequestById(id) {
    const requests = await this.#getRequests();
    const idx = requests.findIndex((item) => item.id === id);
    if (idx === -1) return null;
    const [result] = requests.splice(idx, 1);
    await this.#writeRequests(requests);
    this.emit("requestDeleted", result);
    return result;
  }
}
