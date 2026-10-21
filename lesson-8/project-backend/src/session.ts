import session from "express-session";
import connectPgSimple from "connect-pg-simple";

const {SESSION_SECRET: secret, DATABASE_URL: conString, NODE_ENV} = process.env;

if(!secret) throw new Error("process.env.SESSION_SECRET not define");

const SESSION_TTL_MS = 1000 * 60 * 60 * 24;

export const SESSION_COOKIE_NAME = "sessionId";

export const sessionCookieOptions = {
    httpOnly: true,
    secure: NODE_ENV === "production",
    sameSite: "none" as const
}

const pgStore = connectPgSimple(session);

export const sessionMiddleware = session({
    name: SESSION_COOKIE_NAME,
    secret,
    store: new pgStore({
        conString,
        tableName: "Session",
        createTableIfMissing: true,
        disableTouch: true
    }),
    resave: false,
    saveUninitialized: false,
    cookie: {
        ...sessionCookieOptions,
        maxAge: SESSION_TTL_MS
    }
})