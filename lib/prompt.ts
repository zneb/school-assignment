import promptSync from "prompt-sync";

export const getInput = promptSync();

/** Wait for user input before continuing */
export function continueMessage() {
  getInput.hide("Press enter to continue: ");
}

export function getNumber(ask: string) {
  return Number(getInput(ask));
}
