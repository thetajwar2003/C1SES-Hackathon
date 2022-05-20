import numeral from 'numeral';

export function formatCurrency(number) {
    return numeral(number).format(Number.isInteger(number) ? '$0,0' : '$0,0.00');
}

export function formatPercent(number) {
    return numeral(number / 100).format('0.0%');
}

export function formatNumber(number) {
    return numeral(number).format();
}