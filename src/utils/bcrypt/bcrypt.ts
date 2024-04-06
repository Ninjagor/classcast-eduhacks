import bcrypt from "bcrypt";

export async function Hash(
  string: string, 
  // eslint is so bad, its saying "DONT USE TRIVIAL TYPE ANNOTATIONS" :(
  // eslint-disable-next-line
  hashRounds: number = 8
): Promise<string> {
  // eslint-disable-next-line
  const hashedString = await bcrypt.hash(string as string, hashRounds as number);
  return hashedString;
}

export async function Compare(
  plainText: string, 
  hashedText: string
): Promise<boolean> {
  // eslint-disable-next-line
  const match = await bcrypt.compare(plainText as string, hashedText as string);
  return match;
}