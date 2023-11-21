import pg from "pg";

const client = new pg.Client({
  user: "postgres",
  host: "localhost",
  database: "school",
  password: "password",
  port: 5432,
});

await client.connect();

// Exports a single instance of the client anywhere it's imported
export { client };
