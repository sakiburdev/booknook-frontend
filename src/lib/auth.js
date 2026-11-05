import { betterAuth } from "better-auth";
import { MongoClient } from "mongodb";
import { mongodbAdapter } from "@better-auth/mongo-adapter";
import { jwt } from "better-auth/plugins";

const client = new MongoClient(process.env.MONGODB_URL);
const db = client.db("booknook");

export const auth = betterAuth({
 baseURL: process.env.BETTER_AUTH_URL,

  emailAndPassword: {
    enabled: true,
  },

  socialProviders: {
    google: {
      clientId: process.env.GOOGLE_CLIENT_ID,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET,
    },
  },

  database: mongodbAdapter(db, {
    client,
  }),

  plugins: [jwt({ jwt: { expirationTime: "3d" } })],
  session: {
    enabled: true,
    strategy: "jwt",
    maxAge: 3 * 24 * 60 * 60,
    expiresIn: 3 * 24 * 60 * 60,
  },
});
