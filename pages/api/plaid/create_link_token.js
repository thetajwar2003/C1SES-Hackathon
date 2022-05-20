import { client } from "./index";
import nextConnect from "next-connect";

const handler = nextConnect();

export default handler.get(async (req, res) => {
    const tokenResponse = await client.linkTokenCreate({
        user: { client_user_id: 'fdsf' },
        client_name: "Plaid's Tiny Quickstart",
        language: "en",
        products: ["auth"],
        country_codes: ["US"],
        redirect_uri: process.env.PLAID_SANDBOX_REDIRECT_URI,
    });
    res.json(tokenResponse.data);
});