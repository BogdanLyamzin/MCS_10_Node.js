import { createRequest, deleteRequestById } from "./requests/index.js";

const {id} = await createRequest({
    name: "Bogdan",
    message: "Не можу зайти в адмінський обліковий запит"
});

console.log(await deleteRequestById(id));