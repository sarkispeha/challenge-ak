import { db } from '../firebase';

// User API

export const doCreateUser = async (id, username, email, role) => {
  // eslint-disable-next-line
  const saveUser = await db.ref(`users/${id}`).set({
    username,
    email,
    role
  });

};

export const onceGetUsers = async () => {
  return await db.ref('users').once('value');
};

export const getOneUser = async (uid) => {
  return await db.ref('users').child(uid).once('value');
}