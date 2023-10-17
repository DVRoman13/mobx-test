import { Route, Routes } from 'react-router-dom';
import Home from './pages/Home.tsx';
import UserPage from './pages/UserPage.tsx';
import CreatePage from './pages/CreatePage.tsx';

const AppRouter = () => {
  return (
    <Routes>
      <Route
        path="/"
        element={<Home />}
      />
      <Route
        path="/users/:id"
        element={<UserPage />}
      />
      <Route
        path="/create-user"
        element={<CreatePage />}
      />
    </Routes>
  );
};

export default AppRouter;
