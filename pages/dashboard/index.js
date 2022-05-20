// @mui
import { Grid, Container, Stack, Typography, Divider } from '@mui/material';
import { styled } from '@mui/material/styles';
// components
import Page from '../../components/Page';
// sections
import {
    BankingWidgetSummary,
    BankingCurrentBalance,
    BankingBalanceStatistics,
    BankingExpensesCategories,
    BankingLoanWheel
} from '../../components/bank';
import { News } from '../../components/news';


// ----------------------------------------------------------------------
const RootStyle = styled(Page)(({ theme }) => ({
    margin: '0px',
    padding: '0px',
    overflow: 'hidden',
}));

export const getStaticProps = async () => {
    const res = await fetch("https://mqqniutdba.execute-api.us-east-1.amazonaws.com/default/getMyNewsApiKey");
    const data = await res.json();
    const id = data.body.clientId.newsApiKey;
    return {
        props: {
            newsKey: id
        }
    };
};

export default function Dashboard({ newsKey }) {
    return (
        <RootStyle title="General: Banking">
            <Container maxWidth={'lg'}>

                <Grid container spacing={3} sx={{ mt: 2, mb: 2 }}>
                    <Grid item xs={12}>
                        <Typography variant='h2'>
                            Welcome John!
                        </Typography>
                        <Divider />
                    </Grid>
                    <Grid item xs={12} md={7}>
                        <Stack direction={{ xs: 'column', sm: 'row' }} spacing={3}>
                            <BankingWidgetSummary
                                title="Income"
                                icon={'eva:diagonal-arrow-right-up-fill'}
                                percent={2.6}
                                total={6729}
                                chartData={[111, 136, 76, 108, 74, 54, 57, 84]}
                            />
                            <BankingWidgetSummary
                                title="Expenses"
                                color="warning"
                                icon={'eva:diagonal-arrow-right-down-fill'}
                                percent={-0.5}
                                total={2930}
                                chartData={[111, 136, 76, 108, 74, 54, 57, 84]}
                            />
                        </Stack>
                    </Grid>

                    <Grid item xs={12} md={5}>
                        <BankingCurrentBalance />
                    </Grid>

                    <Grid item xs={12} md={12}>
                        <Stack spacing={3}>
                            <BankingBalanceStatistics />
                        </Stack>
                    </Grid>
                    <Grid item xs={12} md={8}>
                        <BankingExpensesCategories />
                    </Grid>
                    <Grid item xs={12} md={4}>
                        <BankingLoanWheel />
                    </Grid>
                    <Grid item xs={12} md={12}>
                        <News apiKey={newsKey} />
                    </Grid>
                </Grid>
            </Container>
        </RootStyle>
    );
}
