import { createBrowserRouter, redirect } from "react-router-dom";
import LoginPage from "../views/LoginPage";
import BaseLayout from "../views/BaseLayout";
import HomePage from "../views/HomePage";
import DetailPage from "../views/DetailPage";
import AddPage from "../views/AddPage";
import EditPage from "../views/EditPage";
import Toastify from "toastify-js";

const url = "https://server.yoelk20.tech";

const router = createBrowserRouter([
  {
    path: "/login",
    element: <LoginPage url={url} />,
    loader: () => {
      if (localStorage.access_token) {
        Toastify({
          text: "You already logged in",
          duration: 2000,
          newWindow: true,
          close: true,
          gravity: "top",
          position: "left",
          stopOnFocus: true,
          style: {
            background: "#EF4C54",
            color: "#17202A",
            boxShadow: "0 5px 10px black",
            fontWeight: "bold",
          },
        }).showToast();
        return redirect("/");
      }

      return null;
    },
  },
  {
    element: <BaseLayout />,
    loader: () => {
      if (!localStorage.access_token) {
        Toastify({
          text: "Please login first",
          duration: 2000,
          newWindow: true,
          close: true,
          gravity: "top",
          position: "left",
          stopOnFocus: true,
          style: {
            background: "#EF4C54",
            color: "#17202A",
            boxShadow: "0 5px 10px black",
            fontWeight: "bold",
          },
        }).showToast();
        return redirect("/login");
      }

      return null;
    },
    children: [
      {
        path: "/",
        element: <HomePage url={url} />,
      },
      {
        path: "/detail/:id",
        element: <DetailPage url={url} />,
      },
      {
        path: "/add",
        element: <AddPage url={url} />,
      },
      {
        path: "/edit/:id",
        element: <EditPage url={url} />,
      },
    ],
  },
]);

export default router;

