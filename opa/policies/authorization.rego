package main

import data.authz

default allow = false

allow {
    claims.iss == "https://dev-wfk714pl0dln3oip.us.auth0.com/"
    valid_ip(input.ip)
}

valid_ip(ip) {
    allowed_ips := {"::ffff:127.0.0.1", "::ffff:192.168.146.59", "::ffff:172.17.0.1", "::ffff:172.18.0.1", "::ffff:172.19.0.1", "::ffff:172.20.0.1", "::ffff:172.21.0.1", "::ffff:172.22.0.1", "::ffff:172.23.0.1", "::ffff:172.24.0.1"}  # Relace with your allowed IPs
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
