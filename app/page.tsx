import React from "react";
import { Button } from "@/components/ui/button";

function HomePage() {
  return (
    <div>
      <h1 className="text-7xl">Home Page</h1>
      <Button variant="default" size="lg" className="capitalize m-8">
        click me
      </Button>
    </div>
  );
}

export default HomePage;
