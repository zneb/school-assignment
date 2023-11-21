import { client } from "./client";

/**
 * Update a student's email
 * @param studentId Student's id
 * @param newEmail Student's email
 * @returns Result of the query
 */
export async function updateStudentEmail(studentId: number, newEmail: string) {
  return client.query(`
      update students
      set email = '${newEmail}'
      where student_id = ${studentId}
      returning student_id;
    `);
}
