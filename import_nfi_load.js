import { sleep } from "k6";
import http from "k6/http";
import access_header from "./auth.js";
import { Trend } from "k6/metrics";


var myTrend = new Trend("waiting_time");


const payload = JSON.parse(open("./test_data/nfi_payload.json"))

//  console.log(JSON.stringify(payload))

export const options = {
  stages: [
    { duration: "5s", target: 1 }
  ]
};

export default function() {
  let response
  let nfi_load_import_url = "http://datalake.testing.swagger.carggo.int/v1/datalake/loads"
  let headers = { headers: { "Content-Type": "application/json" } }

  response = http.post(nfi_load_import_url, JSON.stringify(payload), headers  )

    console.log(response.status + ": " + response.body);
    //console.log("Response time was " + String(response.timings.duration) + " ms");
    //console.log("Total timings: " + myTrend.add(response.timings.waiting));
    myTrend.add(response.timings.waiting)

}
