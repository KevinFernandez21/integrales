import type { MetaFunction } from "@remix-run/node";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import Calculator from "../components/Calculator";
import {Outlet} from "@remix-run/react";

export const meta: MetaFunction = () => {
  return [
    { title: "New Remix App" },
    { name: "description", content: "Welcome to Remix!" },
  ];
};

export default function Index() {
  return (
    <div className="flex h-screen items-center justify-center">
      <Navbar />
      <main className="flex-grow container mx-auto p-6">
        <Calculator />
        <Outlet />
      </main>
      <Footer />
    </div>
  );
}

