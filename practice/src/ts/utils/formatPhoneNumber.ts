export const formatPhoneNumber = (input: string): string => {
  const zip: string = input.substring(0, 3);
  const middle: string = input.substring(3, 6);
  const last: string = input.substring(6, 10);

  return `(${zip}) ${middle}-${last}`;
};
