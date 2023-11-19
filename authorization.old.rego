package main

import data.authz


allow {
    claims.iss == "https://dev-wfk714pl0dln3oip.us.auth0.com/"
}

claims := payload {
       [_, payload, _] := io.jwt.decode(bearer_token)
}
bearer_token := t {
    v := input.attributes.request.http.headers.authorization
    startswith(v, "Bearer ")
    t := substring(v, count("Bearer "), -1)
}



