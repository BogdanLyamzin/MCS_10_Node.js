import { getRequests, writeRequests } from "./requestOperations.js";

import writeAuditLog from "../logs/writeAuditLog.js";
import updateStatistics from "../stats/updateStatistics.js";

const createRequest = async payload => {
    const requests = await getRequests();
    const newRequest = {
        id: Date.now(),
        status: "new",
        ...payload,
    };
    requests.push(newRequest);
    await writeRequests(requests);
    await writeAuditLog(newRequest, "requestCreated");
    await updateStatistics("requestCreated");
    return newRequest;
}

export default createRequest;