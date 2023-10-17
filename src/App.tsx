import AppRouter from './AppRouter.tsx';
import Header from './components/Header';
import { useUsers } from './store/store.ts';
import { useEffect } from 'react';

const App = () => {
  const usersStore = useUsers();
  useEffect(() => {
    if (!usersStore.users.length) {
      usersStore.fetchUsers();
    }
  }, []);
  return (
    <>
      <Header />
      <AppRouter />
    </>
  );
};

export default App;
