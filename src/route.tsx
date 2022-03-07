import { lazy, Suspense } from "react";
import { useRoutes, Navigate } from "react-router-dom";
import Home from "@/components/Home";
const Login = lazy(
  () => import(/*WebpackChunkName: Login */ "@/components/Login")
);
const Welcome = lazy(
  () => import(/*WebpackChunkName: Welcome */ "@/components/Welcome")
);
// const Home = import('@/components/Home')
const Users = lazy(
  () => import(/*WebpackChunkName: Users */ "@/components/Users")
);
const Goods = lazy(
  () => import(/*WebpackChunkName: Goods */ "@/components/Goods")
);

const useRoute = () => {
  return useRoutes([
    {
      path: "/login",
      element: (
        <Suspense fallback={null}>
          <Login />
        </Suspense>
      ),
    },
    {
      path: '',
      element: <Navigate to="/home" />
    },
    {
      path: "/home",
      element: <Home />,
      children: [
        {
          path: "",
          element: (
            <Suspense fallback={null}>
              <Welcome />
            </Suspense>
          ),
          index: true,
        },
        {
          path: "user",
          element: (
            <Suspense fallback={null}>
              <Users />
            </Suspense>
          ),
        },
        {
          path: "good",
          element: (
            <Suspense fallback={null}>
              <Goods />
            </Suspense>
          ),
        },
      ],
    },
  ]);
};

export default useRoute;
