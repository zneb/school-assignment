import { client } from "./client";

/**
 * Adds a student to the db
 * @param firstName Student's first name
 * @param lastName Student's last name
 * @param email Student's email
 * @param enrollmentDate Student's enrollment date (YYYY-MM-DD)
 * @returns result of the query
 */
export async function addStudent(
  firstName: string,
  lastName: string,
  email: string,
  enrollmentDate: string
) {
  return client.query(`
      INSERT INTO students (first_name, last_name, email, enrollment_date) VALUES
      ('${firstName}', '${lastName}', '${email}', '${enrollmentDate}')
    `);
}
