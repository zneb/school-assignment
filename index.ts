import {
  client,
  addStudent,
  updateStudentEmail,
  deleteStudent,
  getAllStudents,
  getInput,
  getNumber,
  continueMessage,
} from "./lib";
import { populate } from "./lib/populate";

/** The main control flow of the program */
async function main() {
  // This line will reset or create the data for the students table
  // Comment it out to persist data after running the program again
  await populate();

  while (true) {
    console.log(
      `
Pick an action to do: 
1. Display all students
2. Add a student
3. Update a student's email
4. Delete a student
0. Quit program
`
    );
    const selected = getNumber("Enter an option: ");
    if (isNaN(selected)) {
      console.log(">> Input is invalid. try again");

      continueMessage();
      continue;
    }

    if (selected < 0 || selected > 4) {
      console.log(">> Entered number is invalid. try again");

      continueMessage();
      continue;
    }

    if (selected === 1) {
      console.log(">> Displaying students");

      await getAllStudents();

      continueMessage();
      continue;
    }

    if (selected === 2) {
      console.log(">> Creating student");

      const firstName = getInput("Enter a first name: ");
      const lastName = getInput("Enter a last name: ");
      const email = getInput("Enter an email: ");
      const date = getInput("Enter a date (YYYY-MM-DD): ");

      await addStudent(firstName, lastName, email, date).catch((e) => {
        if (e.code === "23505") {
          console.log(">> Failed to add student. Invalid Email");
          return;
        }

        if (e.code === "22007" || e.code === "22008") {
          console.log(">> Failed to add student. Invalid Date");
          return;
        }

        console.log(">> Failed to add student");
      });

      continueMessage();
      continue;
    }

    if (selected === 3) {
      console.log(">> Updating student email");

      const studentId = getNumber("Enter student id: ");
      const email = getInput("Enter a new email: ");

      await updateStudentEmail(studentId, email).catch((e) => {
        if (e.code === "42703") {
          console.log(">> Failed to update student email. Invalid Id");
          return;
        }
        console.log(">> Failed to update student email");
      });

      continueMessage();
      continue;
    }

    if (selected === 4) {
      console.log(">> Deleting student record");

      const studentId = getNumber("Enter student id: ");
      await deleteStudent(studentId).catch((e) => {
        if (e.code === "42703") {
          console.log(">> Failed to delete student record. Invalid Id");
          return;
        }

        console.log(">> Failed to delete student record", e);
      });

      continueMessage();
      continue;
    }

    if (selected === 0) {
      console.log(">> Exiting program");
      break;
    }

    break;
  }
  await client.end();
}

main();
