import { lazy, Suspense } from "react";
import { useRoutes } from "react-router-dom";
import Home from "@/components/Home";
const Login = lazy(
  () => import(/*WebpackChunkName: Login */ "@/components/Login")
);
// const Home = lazy(
//   () => import(/*WebpackChunkName: Home */ "@/components/Home")
// );
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
      path: "/home",
      element: <Home />,
      children: [
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
