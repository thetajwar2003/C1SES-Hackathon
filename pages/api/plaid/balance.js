import { client } from "./index";
import nextConnect from "next-connect";

const handler = nextConnect();
export default handler.get(async (req, res, next) => {
    const access_token = req.access_token;
    const balanceResponse = await client.accountsBalanceGet({ access_token });
    res.json({
        Balance: balanceResponse.data,
    });
});