import { compare, hash } from 'bcrypt';

const SALT_ROUNDS = 12;

function generateHash(password) {
  return hash(password, SALT_ROUNDS);
};

function checkPassword(password, hash) {
  return compare(password, hash);
};


export { generateHash, checkPassword };