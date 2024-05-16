import { createBrowserRouter } from "react-router-dom";
import App from "../App";
import { Home, NotFound, Furniture, FurnitureDetail } from "../pages";

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
      },
      {
        path: "furnitures/:slug",
        element: <FurnitureDetail />,
      },
      {
        path: "*",
        element: <NotFound />,
      },
    ],
  },
]);
