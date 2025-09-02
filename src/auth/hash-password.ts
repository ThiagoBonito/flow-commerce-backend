import bcrypt from "bcrypt";

const SALT_ROUNDS = 10;

export async function hashPassword(password: string): Promise<string> {
	const salt = await bcrypt.genSalt(SALT_ROUNDS);
	const hashed = await bcrypt.hash(password, salt);
	return hashed;
}

export async function verifyPassword(
	plainPassword: string,
	hashedPassword: string,
): Promise<boolean> {
	return await bcrypt.compare(plainPassword, hashedPassword);
}
