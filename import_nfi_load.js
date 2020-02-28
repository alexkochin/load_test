import { check, sleep } from "k6";
import http from "k6/http";
import access_header from "./auth.js";
import { Trend , Rate} from "k6/metrics";
import papaparse from './node_modules/papaparse/papaparse.js';


export const options = {
  stages: [
    { duration: "11s", target: 50 }
  ]
};

var duration_trend = new Trend("Reques duration time");
var fail_rate = new Rate("failed requests");
const payload = JSON.parse(open("./test_data/nfi_payload.json"));

//  console.log(JSON.stringify(payload))
export function setup() {
  const auth_header = access_header();
  return auth_header
  };


//Main test body starts here
export default function(auth_header) {
  let response
  let nfi_load_import_url = "https://testapi.carggo.com/v1/datalake/loads"
  let headers = { headers: { "Content-Type": "application/json", "authorization": auth_header } }

    response = http.post(nfi_load_import_url, JSON.stringify(payload), headers  )
    duration_trend.add(response.timings.duration)
    fail_rate.add(response.status !== 201)
    console.log(response.status)
    check(response, {
      "is status 201": (r) => r.status === 201
  });

}

// run this with following command:
// k6 run --out influxdb=http://mon.carggo.local:8086/grafana import_nfi_load.js
