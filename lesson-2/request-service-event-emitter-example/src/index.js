import RequestService from "./requests/RequestService.js";

import writeAuditLog from "./logs/writeAuditLog.js";
import updateStatistics from "./stats/updateStatistics.js";

const requestService = new RequestService();

requestService.on("requestCreated", async request => {
    await writeAuditLog(request, "requestCreated")
});

requestService.on("requestCreated", async request => {
    await updateStatistics("requestCreated")
});

requestService.on("requestDeleted", async request => {
    await writeAuditLog(request, "requestDeleted")
});

requestService.on("requestDeleted", async request => {
    await updateStatistics("requestDeleted")
});

requestService.create({
    name: "Bogdan",
    message: "Не можу зайти в  обліковий запис адмінки"
});

