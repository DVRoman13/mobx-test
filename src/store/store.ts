import { Instance, types } from 'mobx-state-tree';
import { IUsers } from '../types.ts';
import { createContext, useContext } from 'react';

type TUser = Instance<IUsers>;
type TUserStore = Instance<typeof UserStore>;

export const UserModel = types.model('UserModel', {
  id: types.number,
  username: types.string,
  email: types.string,
  website: types.string,
});

export const UserStore = types
  .model('UserStore', {
    users: types.array(UserModel),
    user: types.maybeNull(UserModel),
  })
  .actions((store: any) => ({
    setUsers(newUsers: any) {
      store.users = newUsers;
    },
    setUser(user: any) {
      store.user = user;
    },
    async fetchUsers() {
      const data = await fetch('https://jsonplaceholder.typicode.com/users');
      const users = await data.json();
      store.setUsers(users);
    },
    async deleteUser(id: number) {
      store.setUsers(store.users.filter((el: TUser) => el.id != id));
    },
    async getUser(id: string | undefined) {
      // const data = await fetch(`https://jsonplaceholder.typicode.com/users/${id}`);
      // const user = await data.json();
      // store.setUser(user);
      const users = [...store.users];
      const user: IUsers = users.find(el => el.id == id);
      if (!user) return;
      store.setUser(JSON.parse(JSON.stringify(user)));
    },
    editUser(name: string, id: number) {
      const users = [...store.users];
      const user: IUsers = users.find(el => el.id == id);
      if (!user) return;
      user.username = name;
      store.setUsers(users);
    },
    addUser(user: IUsers) {
      store.users.push(user);
    },
  }));
export const initialState = UserStore.create({
  user: null,
  users: [],
});

const RootStoreContext = createContext<null | TUserStore>(null);
export const Provider = RootStoreContext.Provider;

export const useUsers = () => {
  const store = useContext(RootStoreContext);

  if (!store) {
    throw new Error('Store cannot be null, please add a context provider');
  }

  return store;
};
