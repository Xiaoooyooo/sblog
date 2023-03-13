import { Provider } from "react-redux";
import { lazy, Suspense } from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import store from "@/store";

import BasicLayout from "@/layouts/BasicLayout";
import Header from "@/components/Header";
import Aside from "@/components/Aside";

const Blog = lazy(
  () => import(/* webpackChunkName: "Blog" */ "@/components/Blog")
);

export default function App() {
  return (
    <Provider store={store}>
      <BrowserRouter basename="/">
        <BasicLayout head={<Header />} aside={<Aside />}>
          <Routes>
            <Route index element={<h1>Hello</h1>} />
            <Route
              path="*"
              element={
                <Suspense fallback={<div>Loading...</div>}>
                  <Blog />
                </Suspense>
              }
            />
          </Routes>
        </BasicLayout>
      </BrowserRouter>
    </Provider>
  );
}
