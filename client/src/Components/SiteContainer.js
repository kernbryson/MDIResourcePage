import React, { useState } from "react";
import Scrape from "./Scraper";
import Home from "./Home"
import SideBar from "./SideBar"
import AldridgeScrape from "./AldridgeScrape";

export default function PortfolioContainer() {
  const [currentPage, setCurrentPage] = useState("Home");

  // This method is checking to see what the value of `currentPage` is. Depending on the value of currentPage, we return the corresponding component to render.
  const renderPage = () => {
    if (currentPage === "Home") {
      return <Home />;
    }
    if (currentPage === "Scrape") {
      return <Scrape />;
    }
    if (currentPage === "AldridgeScrape") {
      return <AldridgeScrape />;
    }

    return <Home />;
  };

  const handlePageChange = (page) => setCurrentPage(page);

  return (
    
    <div>
      {/* We are passing the currentPage from state and the function to update it */}
      <SideBar currentPage={currentPage} handlePageChange={handlePageChange} />
      {/* Here we are calling the renderPage method which will return a component  */}
      {renderPage()}
      
    </div>
  );
}
