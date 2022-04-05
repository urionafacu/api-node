import bcryptjs from 'bcryptjs';

const SALT = Number(process.env.SALT) || 10;

/**
 * @param passwordPlain
 */
export const encrypt = async (passwordPlain: string) => {
  const hash = await bcryptjs.hash(passwordPlain, SALT);
  return hash;
};

/**
 * @param passwordPlain
 * @param hashPassword
 */
export const compare = async (passwordPlain: string, hashPassword: string) => {
  return bcryptjs.compare(passwordPlain, hashPassword);
};
