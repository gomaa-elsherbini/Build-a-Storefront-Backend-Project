import { User, UserStore } from '../user_model';

const store = new UserStore();

describe('User Model', () => {
  it('should have a create method', () => {
    expect(store.createUser).toBeDefined();
  });
  it('should have an index method', () => {
    expect(store.getAllUsers).toBeDefined();
  });
  it('should have a show method', () => {
    expect(store.getOneUser).toBeDefined();
  });
  it('should have a authenticate method', () => {
    expect(store.getOneUser).toBeDefined();
  });

  it('create method should create a new user', async () => {
    const createdUser = await store.createUser({
      username: 'koko',
      first_name: 'ko',
      last_name: 'ko',
      password: 'koko',
    } as User);
    expect(createdUser).toEqual({
      id: 3,
      username: 'koko',
      first_name: 'ko',
      last_name: 'ko',
    });
  });

  it('index method should return a list of all users', async () => {
    const result = await store.getAllUsers();
    expect(result).toEqual([
      {
        id: 1,
        username: 'username1',
        first_name: 'user1',
        last_name: 'name1',
      },
      {
        id: 2,
        username: 'moSalah',
        first_name: 'mo',
        last_name: 'salah',
      },
      {
        id: 3,
        username: 'koko',
        first_name: 'ko',
        last_name: 'ko',
      },
    ]);
  });

  it('show method should return the correct user', async () => {
    const result = await store.getOneUser(1);
    expect(result).toEqual({
      id: 1,
      username: 'username1',
      first_name: 'user1',
      last_name: 'name1',
    });
  });
  it('authentication method should return a user in case of valid username and password', async () => {
    const result = (await store.authenticate('username1', 'pass1')) as User;
    expect(result.id).toBe(1);
    expect(result.username).toBe('username1');
    expect(result.first_name).toBe('user1');
    expect(result.last_name).toBe('name1');
  });
});
