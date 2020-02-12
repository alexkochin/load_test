import { check, sleep } from "k6";
import http from "k6/http";
import access_header from "./auth.js";
import { Trend } from "k6/metrics";


var myTrend = new Trend("waiting_time");


const payload = JSON.parse(open("./test_data/nfi_payload.json"))

//  console.log(JSON.stringify(payload))
export function setup() {
  const auth_header = access_header();
  return auth_header
  };

export const options = {
  stages: [
    { duration: "3s", target: 1 }
  ]
};

export default function(auth_header) {
  let response
  let nfi_load_import_url = "http://datalake.testing.swagger.carggo.int/v1/datalake/loads"
  let headers = { headers: { "Content-Type": "application/json", "authorization": auth_header } }

  response = http.post(nfi_load_import_url, JSON.stringify(payload), headers  )
    myTrend.add(response.timings.waiting)

    check(response, {
      "is status 201": (r) => r.status === 201
  });

}
