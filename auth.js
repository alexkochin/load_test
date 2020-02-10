import { sleep } from "k6";
import http from "k6/http";

export const options = {
  stages: [
    { duration: "10s", target: 1 }
  ]
};

export default function() {
  let response;

  // Get token
  response = http.post(
    "https://testing.carggo.com/auth/realms/CarggoSecurityRealm/protocol/openid-connect/token"
  );

  sleep(1);
}
