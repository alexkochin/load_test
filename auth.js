import { sleep } from "k6";
import http from "k6/http";

export const options = {
  stages: [
    { duration: "2s", target: 1 }
  ]
};

export default function() {
  let response
  let keycloak_url = "https://testing.carggo.com/auth/realms/CarggoSecurityRealm/protocol/openid-connect/token"
  let auth_payload = "client_id=carggo-mdm-app&grant_type=password&client_secret=78aabf56-7b86-4c92-9c1d-355f154c0619&username=chocolate-factory%40carggo.com&password=C%40rggo2%40!9"
  let auth_headers = { headers: { "Content-Type": "application/x-www-form-urlencoded; charset=utf-8", "Host": "testing.carggo.com", "Referer": "https://testing.carggo.com/" } }

  response = http.post(keycloak_url, auth_payload, auth_headers  )
  let access_header = "Bearer " + response.json().access_token;
  //  console.log("Access header: " + access_header)
  return access_header
}
