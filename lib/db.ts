import { compare, digest, validate } from "$x/htpasswd/main.ts";

export interface User {
  username: string;
  password: string;
  inviter?: User["username"];
  invites?: number;
  apikey: string;
}

type seconds = number;

interface Token {
  iss: User["username"]; // The issuer of the token.
  aud: User["username"]; // The audience of the token.
  id: string;
  exp: seconds; // expiration time in seconds.
  iat: seconds; // issued time in seconds.
}

interface Session {
  id: string;
  versionstamp: string;
  expireIn: seconds;
}

const db = await Deno.openKv(Deno.env.get("DATABASE_URL"));

// const { value: admin } = await db.get<User>(["users", "esente"]);
// console.log(admin);
// admin.password = "$2a$10$CRlMram4vO7lw9arlGNQ.OUFhzS/YpOfJ5wdXpneYQDAU4HI2KMiO";
// await db.set(["users", "esente"], admin);

export async function register(username: string, password: string, code = ""): Promise<{ ok: boolean }> {
  const invalid = new Response("Invalid code", {
    status: 401,
    statusText: "Unauthorized",
  });

  const user: User = {
    username,
    password: await digest(password, "BCRYPT"),
    apikey: crypto.randomUUID(),
  }

  if (code) {
    const { value: token } = await db.get<Token>(["tokens", code]);

    if (!token) {
      return invalid;
    }

    if (token.exp * 1000 <= Date.now()) {
      return invalid;
    }

    user.inviter = token.iss;
  }

  const key = ["users", username];
  return db.atomic()
    // Checks that user does not exist
    .check({ key, versionstamp: null })
    // Inserts the user
    .set(key, user)
    // Map the username with the API key
    .set(["apikey", user.apikey], user)
    // Deletes the invite.
    .delete(["tokens", code])
    .commit();
}

export async function login(username: string, password: string): Promise<Session | null> {
  const { value: user } = await db.get<User>(["users", username]);
  if (!user) {
    return null;
  }
  if (!await compare(password, user.password, "BCRYPT")) {
    return null;
  }

  const sessionId = crypto.randomUUID();
  const expireIn = 60 * 60 * 2 * 1000; // 2 hours
  const { versionstamp } = await db.set(["sessions", sessionId], user, {
    expireIn,
  });

  return {
    id: sessionId,
    versionstamp,
    expireIn,
  }
}

export async function getUser(sessionId: string): Promise<User | null> {
  if (!sessionId) {
    return null;
  }
  const { value: user } = await db.get<User>(["sessions", sessionId]);
  return user;
}
