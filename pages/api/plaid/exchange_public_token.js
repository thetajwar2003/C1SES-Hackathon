import { client } from "./index";
import nextConnect from "next-connect";

const handler = nextConnect();
export default handler.post(async (req, res, next) => {
    const exchangeResponse = await client.itemPublicTokenExchange({
        public_token: req.body.public_token,
    }).then((r) => {
        req.access_token = r.data.access_token;
    });

    // FOR DEMO PURPOSES ONLY
    // Store access_token in DB instead of session storage
    // console.log(exchangeResponse.data);
    // req.session.access_token = exchangeResponse.data.access_token;
    res.json(true);
});