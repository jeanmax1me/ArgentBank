import { createRoot } from "react-dom/client";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import SignIn from "./components/SignIn";
import Home from "./App";
import User from "./components/User";
import "./index.css";
import { Provider } from "react-redux";
import { store } from "./app/store";
import React from "react";
import ProfilePage from "./components/ProfilePage";

// Function to render the app
function renderApp() {
  const rootElement = document.getElementById("root");
  if (!rootElement) {
    console.error(
      "Root element with ID 'root' was not found in the document. Ensure there is a corresponding HTML element with the ID 'root' in your HTML file.",
    );
    return;
  }

  const router = createBrowserRouter([
    {
      path: "/",
      element: <Home />,
    },
    {
      path: "/sign-in",
      element: <SignIn />,
    },
    {
      path: "/user",
      element: <User />,
    },
    {
path: "/profile",
element: <ProfilePage />,
    },
  ]);

  createRoot(rootElement).render(
    <React.StrictMode>
    <Provider store={store}>
      <RouterProvider router={router}></RouterProvider>
    </Provider>
    </React.StrictMode>
  );
}

// Call the renderApp function when the DOM content is loaded
document.addEventListener("DOMContentLoaded", renderApp);
