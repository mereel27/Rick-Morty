import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App, { profileLoader } from './App';
import CharDetails, { charLoader } from './CharDetails/CharDetails';
import CharList from './CharList/CharList';
import ErrorMessage from './ErrorMessage/ErrorMessage';

import { GoogleOAuthProvider } from '@react-oauth/google';

import { createBrowserRouter, RouterProvider } from 'react-router-dom';

import reportWebVitals from './reportWebVitals';

const router = createBrowserRouter([
  {
    element: <App />,
    path: '/',
    loader: profileLoader,
    errorElement: <ErrorMessage />,
    children: [
      {
        element: <CharList />,
        path: '/',
      },
      {
        element: <CharDetails />,
        path: 'character/:id',
        loader: charLoader,
        errorElement: <ErrorMessage />,
      },
    ],
  },
]);

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <GoogleOAuthProvider clientId="819557027336-c9p0i1h7gpao41kuk1jn5ajevhuf25dl.apps.googleusercontent.com">
      <RouterProvider router={router} />
    </GoogleOAuthProvider>
  </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
