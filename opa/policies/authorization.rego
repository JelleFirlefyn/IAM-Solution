package main

import data.authz

default allow = false

allow {
    claims.iss == "https://dev-wfk714pl0dln3oip.us.auth0.com/"
    valid_ip(input.ip)
}

valid_ip(ip) {
    allowed_ips := {"127.0.0.1", "192.168.146.59", "172.20.0.1"}  # Replace with your allowed IPs
    allowed_ips[ip]
}
claims := payload {
       [_, payload, _] := io.jwt.decode(bearer_token)
}

bearer_token := t {
    v := input.attributes.request.http.headers.authorization
    startswith(v, "Bearer ")
    t := substring(v, count("Bearer "), -1)
}