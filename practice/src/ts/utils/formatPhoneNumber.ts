export const formatPhoneNumber = (inputField: HTMLInputElement): void => {
  const input: string = inputField.value;
  if (input.length === 10) {
    const zip: string = input.substring(0, 3);
    const middle: string = input.substring(3, 6);
    const last: string = input.substring(6, 10);

    inputField.value = `(${zip}) ${middle}-${last}`;
  }
};
