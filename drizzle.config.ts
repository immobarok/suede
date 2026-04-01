import dotenv from "dotenv";

dotenv.config({ path: ".env.local" });

export default {
  out: "./drizzle",
  schema: "./db/schema",
  dialect: "postgresql",
  schemaFilter: ["public"],
  dbCredentials: {
    url: process.env.DATABASE_URL!,
  },
};
