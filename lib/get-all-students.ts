import { client } from "./client";

/**
 * Prints a list of student's to the screen
 */
export async function getAllStudents() {
  const res = await client.query(`select * from students`);

  console.log(
    "Student Id | First Name | Last Name | Email | Enrollment Date\n"
  );
  for (const row of res.rows) {
    const { student_id, first_name, last_name, email, enrollment_date } =
      row as any;

    const formattedDate = enrollment_date.toISOString().split("T")[0];

    console.log(
      `${student_id} | ${first_name} | ${last_name} | ${email} | ${formattedDate}\n`
    );
  }
}
