import { lazy } from "react";
import { useRoutes } from "react-router-dom";

const Login = lazy(
  () => import(/*WebpackChunkName: Login */ "@/components/Login")
);
const Home = lazy(
  () => import(/*WebpackChunkName: Home */ "@/components/Home")
);
const Users = lazy(
  () => import(/*WebpackChunkName: Users */ "@/components/Users")
);
const Goods = lazy(
  () => import(/*WebpackChunkName: Goods */ "@/components/Goods")
);

const useRoute = () => {
  return useRoutes([
    {
      path: "/",
      element: <Login />,
    },
    {
      path: "/home",
      element: <Home />,
      children: [
        {
          path: "user",
          element: <Users />,
        },
        {
          path: "good",
          element: <Goods />,
        },
      ],
    },
  ]);
};

export default useRoute;
