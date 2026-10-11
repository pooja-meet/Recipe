
import {
  createBrowserRouter,
  RouterProvider,
  Outlet,
} from "react-router-dom";

import "./App.css";
import Home from "./Pages/Home/Home";
import RecipeDetails from "./Pages/RecipeDetails/RecipeDetails";
import Footer from "./component/Footer/Footer";

function Layout() {
  return (
    <>
      <main>
        <Outlet />
      </main>
      <Footer />
    </>
  );
}

const router = createBrowserRouter([
  {
    element: <Layout />,
    children: [
      {
        path: "/",
        element: <Home />,
      },
      {
        path: "/recipe/:id",
        element: <RecipeDetails />,
      },
    ],
  },
]);

export default function App() {
  return <RouterProvider router={router} />;
}
