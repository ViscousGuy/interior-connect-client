import { createBrowserRouter } from "react-router-dom";
import App from "../App";
import {
  Home,
  NotFound,
  Furniture,
  FurnitureDetail,
  Contractor,
  ContractorDetail,
} from "../pages";
import ErrorBoundary from "../ErrorBoundary";

export const router = createBrowserRouter([
  {
    path: "/",
    element: (
      <ErrorBoundary>
        <App />
      </ErrorBoundary>
    ),
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
        path: "contractors",
        element: <Contractor />,
      },
      {
        path: "contractors/:slug",
        element: <ContractorDetail />,
      },
      {
        path: "*",
        element: <NotFound />,
      },
    ],
  },
]);
