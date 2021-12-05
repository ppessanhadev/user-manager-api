import getConnection from './connection';

interface IUser {
  id?: number;
  name: string;
  age: number;
}

class User {
  public async getUsers() {
    const db = await getConnection();

    const [users] = await db.execute('SELECT * FROM Users;');
    return users;
  }

  public async newUser({ name, age }: IUser) {
    const db = await getConnection();

    const [checkUser] = await db.execute('SELECT * FROM Users WHERE name = ?;', [name]);
    if (checkUser[0]) throw new Error('User already exists');

    const [user] = await db.execute(
      'INSERT INTO Users (name, age) VALUES (?, ?);',
      [name, age],
    );
    return user;
  }

  public async updateUser({ id, name, age }: IUser) {
    const db = await getConnection();

    const [response] = await db.execute(
      'UPDATE Users SET name = ?, age = ? WHERE id = ?;',
      [name, age, id],
    );
    return response[0];
  }

  public async deleteUser(id: number) {
    const db = await getConnection();

    await db.execute('DELETE FROM Users WHERE Users.id = ?;', [id]);
    return id;
  }
}

export default new User();
