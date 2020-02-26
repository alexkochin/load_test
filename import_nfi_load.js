import { check, sleep } from "k6";
import http from "k6/http";
import access_header from "./auth.js";
import { Trend , Rate} from "k6/metrics";

export const options = {
  stages: [
    { duration: "10s", target: 50 }
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



export default function(auth_header) {
  let response
  let nfi_load_import_url = "https://testapi.carggo.com/v1/datalake/loads"
  let headers = { headers: { "Content-Type": "application/json", "authorization": auth_header } }

    response = http.post(nfi_load_import_url, JSON.stringify(payload), headers  )

    //console.log(response.status + ": " + JSON.stringify(response.body));
    //console.log("Response time was " + String(response.timings.duration) + " ms");
    //console.log("Total timings: " + myTrend.add(response.timings.waiting));

    duration_trend.add(response.timings.duration)
    fail_rate.add(response.status !== 201)

    check(response, {
      "is status 201": (r) => r.status === 201
  });

}
