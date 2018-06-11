import { db } from '../firebase';

// User API

export const doCreateUser = async (id, username, email) => {
  // eslint-disable-next-line
  const saveUser = await db.ref(`users/${id}`).set({
    username,
    email,
  });

};

export const onceGetUsers = async () => {
  return await db.ref('users').once('value');
};