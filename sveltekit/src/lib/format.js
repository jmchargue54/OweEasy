export const dollars = (cents) => (cents / 100).toLocaleString('en-US', { style: 'currency', currency: 'USD' });
