import {EventEmitter} from "node:events";

const emitter = new EventEmitter();

const users = [];
let nextId = 1;

emitter.once("userCreated", ()=> {
    console.log("Start add users");
})

emitter.on("userCreated", userName => {
    users.push({id: nextId, name: userName});
    nextId += 1;
    console.log("Add user");
});

emitter.on("userCreated", () => {
    console.log(`New user created ${JSON.stringify(users[users.length - 1])}`)
});

emitter.on("error", error => {
    console.log(error.message);
})

emitter.emit("userCreated", "Bogdan");
emitter.emit("userCreated", "Nastya");
emitter.emit("error", new Error("Failed add user"));