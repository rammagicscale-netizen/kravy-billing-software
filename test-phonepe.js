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

    let token = null;

    try {
        const response = await axios.post("https://api.phonepe.com/apis/identity-manager/v1/oauth/token", params, {
            headers: {
                "Content-Type": "application/x-www-form-urlencoded",
            },
        });
        console.log("PROD SUCCESS TOKEN:", response.data.access_token);
        token = response.data.access_token;
    } catch (err) {
        console.error("PROD TOKEN ERROR:", err.response?.data || err.message);
        return;
    }

    // Next try to initiate payment
    const payload = {
        merchantOrderId: "MT" + Date.now(),
        amount: 10000,
        paymentFlow: {
            type: "PG_CHECKOUT",
            merchantUrls: {
                redirectUrl: `http://localhost:3000/api/phonepe/status/123`,
            }
        }
    };

    try {
        const response = await axios.post("https://api.phonepe.com/apis/pg/checkout/v2/pay", payload, {
            headers: {
                Authorization: `O-Bearer ${token}`,
                "Content-Type": "application/json",
            },
        });
        console.log("PAYMENT SUCCESS:", response.data);
    } catch (err) {
        console.error("PAYMENT ERROR:", err.response?.data || err.message);
    }
}

testToken();
