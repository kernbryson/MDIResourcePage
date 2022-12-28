import React from "react";
import { Navigate, useParams } from "react-router-dom";
import Auth from "../utils/auth";

const FAQ = () => {


  return <div class="container py-4 sectioncont">
<section>
  <h3 class="text-center mb-4 pb-2  fw-bold">FAQ</h3>
  <p class="text-center mb-5">
    Find the answers for the most frequently asked questions below
  </p>

  <div class="row">
    <div class="col-md-6 col-lg-4 mb-4 card cardfix faq">
      <h6 class="mb-3 "><i class="far fa-paper-plane  pe-2"></i>How do I navigate the webpage?</h6>
      <p>
        In order to navigate the webpage look for the three lines at the top left of your screen.
      </p>
    </div>

    <div class="col-md-6 col-lg-4 mb-4 card cardfix faq">
      <h6 class="mb-3 "><i class="fas fa-pen-alt  pe-2"></i> How do I add a skill?</h6>
      <p>
        In order to add a skill you must go to your profile page and fill out the short form that is listed. Once your skill is submitted It will then show on the resource pag that is located on the home page after you are logged in.
      </p>
    </div>

    <div class="col-md-6 col-lg-4 mb-4 card cardfix faq">
      <h6 class="mb-3 "><i class="fas fa-user  pe-2"></i> How do I search for a specific skill im looking for?
      </h6>
      <p>
        You can simply search for a skill by typing in the search box. 
      </p>
    </div>

   
  </div>
</section>

  </div>;
};

export default FAQ;
