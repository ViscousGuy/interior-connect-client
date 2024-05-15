import { Navigate, createBrowserRouter } from "react-router-dom";
import App from "../App";
import { Home, NotFound, Furniture } from "../pages";

export const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    children: [
      {
        path: "",
        element: <Home />,
      },
      {
        path: "furnitures",
        element: <Furniture />,
        // children: [
        //   {
        //     path: ":slug",
        //     element: <FurnitureDetails />,
        //   },
        // ],
      },
      {
        path: "*",
        element: <NotFound />,
      }
    ],
  },
]);
