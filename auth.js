import { sleep } from "k6";
import http from "k6/http";

export const options = {
  stages: [
    { duration: "10s", target: 1 }
  ]
};

export default function() {
  let response;
  let url = "https://testing.carggo.com/auth/realms/CarggoSecurityRealm/protocol/openid-connect/token"
  let payload = "client_id=carggo-mdm-app&grant_type=password&client_secret=78aabf56-7b86-4c92-9c1d-355f154c0619&username=chocolate-factory%40carggo.com&password=C%40rggo2%40!9"
  let params = { headers: { "Content-Type": "application/x-www-form-urlencoded; charset=utf-8", "Host": "testing.carggo.com", "Referer": "https://testing.carggo.com/" } }
  // Get token
  response = http.post(url, payload, params  )

//  if (response.status === 200) {
//      console.log("Response: " + response.body + ": " + response.body)
//    }
  let token = response.access_token
    console.log("Token: " + token)
  sleep(1);
}
