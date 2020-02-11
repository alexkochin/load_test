import { sleep } from "k6";
import http from "k6/http";
import access_header from "./auth.js";

export const options = {
  stages: [
    { duration: "2s", target: 1 }
  ]
};
//let payload = JSON.stringify({"nrPallets":"52","stackablePallets":true,"transportType":"e4b6f2a7-3fbf-425d-b06c-adc4974c1141","stops":[{"country":"US","state":"OH","city":"Vienna","zip5":"44473","geoPoint":{"latitude":41.236431,"longitude":-80.662083}},{"country":"US","state":"FL","city":"Fort Lauderdale","zip5":"33318","geoPoint":{"latitude":26.122308,"longitude":-80.143379}}]})



export default function() {
  var response = null
  let auth_header = access_header()
      //console.log("Hoora " + auth_header)
  let calc_rate_matrix_url = "https://testing.carggo.com/customerhandler/pricefinder/v1.0/calcRateMatrix"
  let headers = { headers: { "Content-Type": "application/json", "Authorization": auth_header,"Host": "testing.carggo.com", "Origin": "https://testing.carggo.com/" } }
    console.log(JSON.stringify(headers))
  response = http.post(calc_rate_matrix_url, headers  )
    console.log(response.body)


}
