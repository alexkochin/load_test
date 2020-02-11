import { sleep } from "k6";
import http from "k6/http";
import access_header from "./auth.js";

const auth_payload = JSON.parse(open("./nfi_payload.json"))


export const options = {
  stages: [
    { duration: "2s", target: 1 }
  ]
};

export default function() {
  let response
  let nfi_load_import_url = "http://datalake.testing.swagger.carggo.int/datalake/loads/import"
  let auth_headers = { headers: { "Content-Type": "application/x-www-form-urlencoded; charset=utf-8", "Host": "testing.carggo.com", "Referer": "https://testing.carggo.com/" } }

  response = http.post(keycloak_url, auth_payload, auth_headers  )
  let access_header = "Bearer " + response.json().access_token;
    console.log("Access header: " + access_header)
  return access_header
}
