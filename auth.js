import { sleep } from "k6";
import http from "k6/http";

export const options = {
  stages: [
    { duration: "10s", target: 1 }
  ]
};

export default function() {
  var url = "https://testing.carggo.com/auth/realms/CarggoSecurityRealm/protocol/openid-connect/token";
  var payload = "client_id=carggo-mdm-app&grant_type=password&client_secret=78aabf56-7b86-4c92-9c1d-355f154c0619&username=chocolate-factory%40carggo.com&password=C%40rggo2%40!9";
  var params =  { headers: { "Content-Type": "application/x-www-form-urlencoded; charset=utf-8","Host": "testing.carggo.com" } }
  http.post(url, payload, params);
};
