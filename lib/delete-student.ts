import { client } from "./client";

/**
 * Delete's a student's record
 * @param studentId Student's id
 * @returns result of the query
 */
export async function deleteStudent(studentId: number) {
  return client.query(`
      delete from students
      where student_id = ${studentId}
    `);
}
