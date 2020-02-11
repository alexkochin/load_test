import { sleep } from "k6";
import http from "k6/http";
import access_token from "./auth.js";

export const options = {
  stages: [
    { duration: "10s", target: 1 }
  ]
};

export default function() {
  
  let mytok = access_token()
    console.log("Hoora " + mytok)

}
