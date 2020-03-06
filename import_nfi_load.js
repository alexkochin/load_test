import { check, sleep } from "k6";
import http from "k6/http";
import access_header from "./auth.js";
import { Trend , Rate} from "k6/metrics";
import papaparse from './node_modules/papaparse/papaparse.js';
import nfi_json from './routines/json_from_csv.js';

var duration_trend = new Trend("Reques duration time");
var fail_rate = new Rate("failed requests");


export const options = {
  stages: [
    { duration: "1s", target: 1 }
  ]
};

export function setup() {
  const auth_header = access_header()
  const payload = nfi_json()
  console.log('My JSON: ' + payload)

  return payload
  return auth_header
  };


//const payload = JSON.stringify(nfi_json())
//console.log('My JSON: ' + payload)

//const file_payload = JSON.parse(open("./test_data/nfi_payload.json"));
//console.log(JSON.stringify(file_payload))






//Main test body starts here
export default function(auth_header, payload) {
  let response
  let nfi_load_import_url = "https://testapi.carggo.com/v1/datalake/loads"
  let headers = { headers: { "Content-Type": "application/json", "authorization": auth_header } }
  let body_to_send = JSON.stringify(payload)
  console.log('Data was: ' + payload)

    response = http.post(nfi_load_import_url, body_to_send, headers  )

    duration_trend.add(response.timings.duration)
    fail_rate.add(response.status !== 200)
    console.log('Response code is ' + response.status + response.body)
    check(response, {
      "Response 200": (r) => r.status === 200
  });

}

// run this with following command:
// k6 run --out influxdb=http://mon.carggo.local:8086/grafana import_nfi_load.js
