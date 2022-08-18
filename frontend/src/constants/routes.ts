// Dependencies
import { FC } from 'react';

// Pages
import { HomePage } from '../pages';

// Interfaces
interface IRoute {
  path: string;
  element: FC;
}

// Export routes
export const ROUTES = {
  HOME: '/'
};

// Export routes
export const PUBLIC_ROUTES: IRoute[] = [
  {
    path: ROUTES.HOME,
    element: HomePage
  }
];
