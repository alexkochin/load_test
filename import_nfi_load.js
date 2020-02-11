import { sleep } from "k6";
import http from "k6/http";
import access_header from "./auth.js";

const payload = JSON.parse(open("./nfi_payload.json"))

  console.log(JSON.stringify(payload))

export const options = {
  stages: [
    { duration: "40s", target: 1 }
  ]
};

export default function() {
  let response
  let nfi_load_import_url = "http://datalake.testing.swagger.carggo.int/datalake/loads/import"
  let auth_headers = { headers: { "Content-Type": "application/json", "Host": "testing.carggo.com", "Referer": "https://testing.carggo.com/" } }

  response = http.post(nfi_load_import_url, payload  )

//  let access_header = "Bearer " + response.json().access_token;
    console.log(response.body)

}
