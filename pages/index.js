// nextjs
import { useRouter } from 'next/router';
import { useState, useEffect, useCallback } from "react";

// plaid
import { usePlaidLink } from "react-plaid-link";
// @mui
import { Grid, Container, Typography, Button, Stack } from '@mui/material';
import { styled } from '@mui/material/styles';
// components
import Page from '../components/Page';
import Navbar from '../components/Navbar';

export default function Home() {
  const [token, setToken] = useState(null);
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);

  const router = useRouter();

  const onSuccess = useCallback(async (publicToken) => {
    setLoading(true);
    await fetch("/api/plaid/exchange_public_token", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ public_token: publicToken }),
    }).then(() => router.push('/dashboard'));
    await getBalance();
  }, []);


  // Creates a Link token
  const createLinkToken = useCallback(async () => {
    // For OAuth, use previously generated Link token
    // if (typeof window !== 'undefined') {
    // if (window.location.href.includes("?oauth_state_id=")) {
    //   // const linkToken = localStorage.getItem('link_token');
    //   setToken(linkToken);
    // } else {
    const response = await fetch("/api/plaid/create_link_token", {});
    const data = await response.json();
    setToken(data.link_token);
    // localStorage.setItem("link_token", data.link_token);
    console.log("TOKEN: ", data.link_token);
    // }
    // }

  }, [setToken]);

  // Fetch balance data
  const getBalance = useCallback(async () => {
    setLoading(true);
    const response = await fetch("/api/plaid/balance", {});
    const data = await response.json();
    setData(data);
    setLoading(false);
  }, [setData, setLoading]);

  let isOauth = false;

  const config = {
    token,
    onSuccess,
  };

  // For OAuth, configure the received redirect URI
  // if (typeof window !== 'undefined') {
  //   if (window.location.href.includes("?oauth_state_id=")) {
  //     config.receivedRedirectUri = window.location.href;
  //     isOauth = true;
  //   }
  // }

  const { open, ready } = usePlaidLink(config);

  useEffect(() => {
    if (token == null) {
      createLinkToken();
    }
    if (isOauth && ready) {
      open();
    }
  }, [token, isOauth, ready, open]);

  const RootStyle = styled(Page)(({ theme }) => ({
    margin: '0px',
    padding: '0px',
    overflow: 'hidden',
  }));

  return (
    < RootStyle title="General: Banking" >
      <Container maxWidth={'lg'}>
        {/* <Navbar /> */}

        <Grid container spacing={3} sx={{ mt: 3 }}>
          <Grid item xs={12} md={6} lg={7} sx={{ pr: { md: 7 } }}>
            <img src={"https://ecm.capitalone.com/WCM/bank/landing-pages/online-banking/online-banking-e4-checkered/06710-lpmigration-onlinebanking-mech-e4.g-desktop/rmobile.png"} />
          </Grid>

          <Grid item xs={12} md={6} lg={5}>

            <Typography variant="h2" sx={{ mb: 3 }}>
              Banking is hard
            </Typography>

            <Typography sx={{ color: 'text.secondary', mb: 3 }}>
              We strive to help college students have an easy entrance to banking. There's so many terminologies and concepts that can be very confusing
              to grasp. Our state of the art platform gets rid of all the unnecessary jargon and only show what's important for college students. Get started
              today by clicking the button below!
            </Typography>

            <Button
              variant="outlined"
              color="inherit"
              size="large"
              onClick={() => open()}
              disabled={!ready}
            >
              Connect Your Accounts!
            </Button>
          </Grid>
          <Grid item md={5}>
            <Typography variant='h2' align='center'>
              Let Us Help You Get The Headstart You Need!
            </Typography>
          </Grid>
          <Grid item md={7}>
            <img src="https://images.moneycontrol.com/static-mcnews/2022/02/digital-banking_pic-1.jpg?impolicy=website&width=770&height=431" style={{ borderRadius: 10 }} />
          </Grid>
        </Grid>
      </Container>
    </RootStyle>


  );
}
