import fetch from 'node-fetch';

export const handler = async (event) => {
  try {
    const symbol = event.queryStringParameters?.symbol;
    if (!symbol) {
      return { statusCode: 400, body: 'Symbol is required' };
    }

    const url = `https://query1.finance.yahoo.com/v8/finance/chart/${symbol}?interval=1m&range=1d`;

    const res = await fetch(url, {
      headers: {
        'User-Agent': 'Mozilla/5.0',
      },
    });

    const json = await res.json();

    const price = json?.chart?.result?.[0]?.meta?.regularMarketPrice ?? 0;

    return {
      statusCode: 200,
      body: JSON.stringify({ symbol, price }),
    };
  } catch (err) {
    return {
      statusCode: 500,
      body: JSON.stringify({ error: err.message }),
    };
  }
};
