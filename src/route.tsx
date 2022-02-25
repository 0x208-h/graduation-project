import React, { lazy } from "react";
import { useRoutes } from "react-router-dom";

const Login = lazy(() => import(/*WebpackChunkName: Login */ "@/components/Login"));

const useRoute = () => {
  return useRoutes([
    {
      path: '/',
      element: <Login />
    },
  ]);
};

export default useRoute;
