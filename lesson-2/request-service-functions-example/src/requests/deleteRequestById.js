import { getRequests, writeRequests } from "./requestOperations.js";

import writeAuditLog from "../logs/writeAuditLog.js";
import updateStatistics from "../stats/updateStatistics.js";

const deleteRequestById = async id => {
    const requests = await getRequests();
    const idx = requests.findIndex(item => item.id === id);
    if(idx === -1) return null;
    const [result] = requests.splice(idx, 1);
    await writeRequests(requests);
    await writeAuditLog(result, "requestDeleted");
    await updateStatistics("requestDeleted");
    return result;
}

export default deleteRequestById;