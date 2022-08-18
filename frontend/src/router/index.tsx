// Dependencies
import { BrowserRouter, Route, Routes, Navigate } from 'react-router-dom';

// Constants
import { PUBLIC_ROUTES, ROUTES } from '../constants';

// Create app router
const AppRouter = () => (
  <BrowserRouter>
    <Routes>
      {PUBLIC_ROUTES.map(({ path, element: E }) => (
        <Route path={path} key={path} element={<E />} />
      ))}
      <Route path="*" element={<Navigate to={ROUTES.HOME} />} />
    </Routes>
  </BrowserRouter>
);

// Export app router
export default AppRouter;
