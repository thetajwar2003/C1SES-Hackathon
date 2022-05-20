import merge from 'lodash/merge';
import ReactApexChart from '../graphs';
// @mui
import { useTheme, styled } from '@mui/material/styles';
import { Card, CardHeader, Typography } from '@mui/material';
// utils
import { formatNumber } from '../../utils/format';
//
import { Options } from '../graphs/';

// ----------------------------------------------------------------------

const CHART_HEIGHT = 494;
const LEGEND_HEIGHT = 72;

const ChartWrapperStyle = styled('div')(({ theme }) => ({
    height: CHART_HEIGHT,
    marginTop: theme.spacing(2),
    '& .apexcharts-canvas svg': { height: CHART_HEIGHT },
    '& .apexcharts-canvas svg,.apexcharts-canvas foreignObject': {
        overflow: 'visible',
    },
    '& .apexcharts-legend': {
        height: LEGEND_HEIGHT,
        alignContent: 'center',
        position: 'relative !important',
        borderTop: `solid 1px ${ theme.palette.divider }`,
        top: `calc(${ CHART_HEIGHT - LEGEND_HEIGHT }px) !important`,
    },
}));

// ----------------------------------------------------------------------

const CHART_DATA = [44, 13];

export default function BankingLoanWheel() {
    const theme = useTheme();

    const chartOptions = merge(Options(), {
        labels: ['Interest', 'Paid'],
        legend: { floating: true, horizontalAlign: 'center' },
        fill: {
            type: 'gradient',
            gradient: {
                colorStops: [
                    [
                        {
                            offset: 0,
                            color: theme.palette.primary.light,
                        },
                        {
                            offset: 100,
                            color: theme.palette.primary.main,
                        },
                    ],
                    [
                        {
                            offset: 0,
                            color: theme.palette.secondary.light,
                        },
                        {
                            offset: 100,
                            color: theme.palette.secondary.main,
                        },
                    ],
                ],
            },
        },
        plotOptions: {
            radialBar: {
                hollow: { size: '68%' },
                dataLabels: {
                    value: { offsetY: 16 },
                    total: {
                        formatter: () => formatNumber(39549),
                    },
                },
            },
        },
    });

    return (
        <Card>
            <CardHeader title="Student Loan" />
            <ChartWrapperStyle dir="ltr">
                <ReactApexChart type="radialBar" series={CHART_DATA} options={chartOptions} height={310} />
                <Typography variant='body1' align='center'>
                    So far you've paid
                    <Typography variant='h4'>
                        $17,401
                    </Typography>
                </Typography>
            </ChartWrapperStyle>
        </Card>
    );
}
