import React, { Component } from "react";
import ReactHTMLTableToExcel from "react-html-table-to-excel";
import axios from "axios";
const cheerio = require("cheerio");
const { v4: uuidv4 } = require("uuid");
const tests = [];
const Id = uuidv4();
var homeObject = {};
let address= ""
let county = ""
let bid = ""
let date = ""
let casenum = ""
function AldridgeScrape() {
  axios
    .get(
      "https://www.brockandscott.com/foreclosure-sales/?_sft_foreclosure_state=ga"
    )
    .then((res) => {
      const htmlData = res.data;
      // console.log(res)
      // console.log(htmlData);
      const $ = cheerio.load(htmlData);
      $("div", htmlData).each((index, element) => {
        let address = $(element).children(".forecol").text().split("\n")[10];
        let county = $(element).children(".forecol").text().split("\n")[0];
        let bid = $(element).children(".forecol").text().split("\n")[11];
        let date = $(element).children(".forecol").text().split("\n")[2];
        let casenum = $(element).children(".forecol").text().split("\n")[8];

        homeObject = {
          address: address,
          county: county,
          bid: bid,
          date: date,
          caseNumber: casenum,
          id: Id,
        };
    
        tests.push(homeObject)
   
      console.log(tests);
      });
 
   

    });

  return (
    <table class="table" id="table-to-xls">
      <thead>
        <tr>
          <th scope="col">Address</th>
          <th scope="col">County</th>
          <th scope="col">Bid</th>
          <th scope="col">Date</th>
          <th scope="col">Case Number</th>
          <th scope="col">
            {" "}
            <ReactHTMLTableToExcel
              id="test-table-xls-button"
              className="download-table-xls-button btn btn-success"
              table="table-to-xls"
              filename="tablexls"
              sheet="tablexls"
              buttonText="Download"
            />
          </th>
        </tr>
      </thead>
      {tests.map((test) => {
        
        return (
          <tbody key={test.id}>
            <tr>
              <td>{test.address}</td>
              <td>{test.county}</td>
              <td>{test.bid}</td>
              <td>{test.date}</td>
              <td>{test.caseNumber}</td>
            </tr>
          </tbody>
        );
        
      })}
    </table>
  );
}

export default AldridgeScrape;
