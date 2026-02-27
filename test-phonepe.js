const axios = require("axios");

async function testToken() {
    const CLIENT_ID = "SU2602261115171719533655";
    const CLIENT_SECRET = "9628fe71-b0f8-48e8-b19e-ce448d1e3da7";
    const CLIENT_VERSION = "1";

    const params = new URLSearchParams();
    params.append("grant_type", "client_credentials");
    params.append("client_id", CLIENT_ID);
    params.append("client_version", CLIENT_VERSION);
    params.append("client_secret", CLIENT_SECRET);

    try {
        const response = await axios.post("https://api.phonepe.com/apis/identity-manager/v1/oauth/token", params, {
            headers: {
                "Content-Type": "application/x-www-form-urlencoded",
            },
        });
        console.log("PROD SUCCESS:", response.data);
    } catch (err) {
        console.error("PROD ERROR:", err.response?.data || err.message);
    }

    try {
        const response2 = await axios.post("https://api-preprod.phonepe.com/apis/pg-sandbox/v1/oauth/token", params, {
            headers: {
                "Content-Type": "application/x-www-form-urlencoded",
            },
        });
        console.log("SANDBOX SUCCESS:", response2.data);
    } catch (err) {
        console.error("SANDBOX ERROR:", err.response?.data || err.message);
    }
}

testToken();
