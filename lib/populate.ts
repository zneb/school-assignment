import { client } from "./client";

const createTable = `create table students
(student_id serial, 
 first_name text NOT NULL, 
 last_name text NOT NULL,
 email text NOT NULL UNIQUE,
 enrollment_date date,
 primary key (student_id)
);
`;

const createRows = `INSERT INTO students (first_name, last_name, email, enrollment_date) VALUES
('John', 'Doe', 'john.doe@example.com', '2023-09-01'),
('Jane', 'Smith', 'jane.smith@example.com', '2023-09-01'),
('Jim', 'Beam', 'jim.beam@example.com', '2023-09-02');`;

/**
 * Resets and populates the database with seed data
 */
async function populate() {
  try {
    await client.query("drop table if exists students");
    await client.query(createTable);
    await client.query(createRows);
    console.log(">> Database has been reset to initial state");
  } catch {
    console.log(">> Failed to populate database");
  }

  client.end();
}

populate();
