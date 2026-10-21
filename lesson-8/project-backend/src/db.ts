import "dotenv/config";
import { PrismaPg } from "@prisma/adapter-pg";
import {PrismaClient} from "../generated/prisma/client.ts";

const {DATABASE_URL: connectionString} = process.env;
if(!connectionString) throw new Error("DATABASE_URL not found");

const adapter = new PrismaPg({connectionString});

const prisma = new PrismaClient({adapter});

export default prisma;