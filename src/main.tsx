import { createRoot } from "react-dom/client";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import SignIn from "./components/SignIn";
import Home from "./App";
import User from "./components/User";
import './index.css'; 

// Function to render the app
function renderApp() {
  const rootElement = document.getElementById("root");
  if (!rootElement) {
    console.error("Root element not found.");
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
  ]);

  createRoot(rootElement).render(<RouterProvider router={router} />);
}

// Call the renderApp function when the DOM content is loaded
document.addEventListener("DOMContentLoaded", renderApp);
