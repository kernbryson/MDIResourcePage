import React, {Component} from 'react';
import ReactHTMLTableToExcel from 'react-html-table-to-excel';
import axios from "axios";
const cheerio = require("cheerio");
const { v4: uuidv4 } = require("uuid");
const homes = [];
var infoObject = {};
const Id = uuidv4();



function Scrape(infoObject) {
  axios
    .get("https://rlselaw.com/property-listing/georgia-property-listings/", {
      method: "HEAD",
      mode: "no-cors"
    })
    .then((res) => {
      const htmlData = res.data;
      const $ = cheerio.load(htmlData);
      $("tr", htmlData).each((index, element) => {
        const address = $(element).children(".property").text()
        const city = $(element).children(".city").text();
        const county = $(element).children(".county").text();
        const bid = $(element).children(".bid").text();
        const date = $(element).children(".date").text();
        console.log(city)
        infoObject = {
          address: address,
          city: city,
          county: county,
          bid: bid,
          date:date,
          id: Id,
        };
        homes.push(infoObject);
      });

      
 
    });

  return (


    <table class="table" id="table-to-xls">
      <thead>
        <tr>
          <th scope="col">Address</th>
          <th scope="col">City</th>
          <th scope="col">County</th>
          <th scope="col">Bid</th>
          <th scope="col">Date</th>
          <th scope="col">    <ReactHTMLTableToExcel
                    id="test-table-xls-button"
                    className="download-table-xls-button btn btn-success"
                    table="table-to-xls"
                    filename="tablexls"
                    sheet="tablexls"
                    buttonText="Download"/></th>
        </tr>
      </thead>
      {homes.map((home) => {
        return (
          <tbody key={home.id}>
            <tr>
              <td>{home.address}</td>
              <td>{home.city}</td>
              <td>{home.county}</td>
              <td>{home.bid}</td>
              <td>{home.date}</td>
            </tr>
          </tbody>
        );
      })}
    </table>
  );
}

export default Scrape;
