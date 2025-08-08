import { Routes, Route } from 'react-router-dom';
import Home from './Home';
import LoginPage from './components/LoginPage';
import SignupPage from './components/SignupPage';
import WithHeaderLayout from './components/layouts/WithHeaderLayout';

const App = () => {
  return (
    <Routes>
      <Route
        path="/"
        element={
          <WithHeaderLayout>
            <Home />
          </WithHeaderLayout>
        }
      />
      <Route
        path="/login"
        element={
          <WithHeaderLayout>
            <LoginPage />
          </WithHeaderLayout>
        }
      />
      <Route
        path="/signup"
        element={
          <WithHeaderLayout>
            <SignupPage />
          </WithHeaderLayout>
        }
      />
    </Routes>
  );
};

export default App;
