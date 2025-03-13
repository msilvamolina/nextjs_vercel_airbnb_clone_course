import Link from "next/link";
import React from "react";

function HomePage() {
  return (
    <div>
      <h1 className="text-7xl">Home Page</h1>
      <Link
        href="/about"
        className="text-xl text-primary-500 inline-block mt-8 py-6 px-12 border border-primary-500 rounded-full hover:bg-black hover:text-white"
      >
        About page
      </Link>
    </div>
  );
}

export default HomePage;
