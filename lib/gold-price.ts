import { GoldApiResponse } from '@/types/goldapi';
import https from 'https';

const GOLD_API_KEY = 'goldapi-it3sm98wefym-io';
const API_URL = 'https://www.goldapi.io/api/XAU/USD';

interface RequestOptions extends https.RequestOptions {
  headers: {
    'x-access-token': string;
    'Content-Type': string;
  }
}

export async function getGoldPrice(): Promise<number> {
  return new Promise((resolve, reject) => {
    const options: RequestOptions = {
      method: 'GET',
      headers: {
        'x-access-token': GOLD_API_KEY,
        'Content-Type': 'application/json'
      }
    };
    
    https.get(API_URL, options, res => {
      let data = '';
      res.on('data', chunk => data += chunk);
      res.on('end', () => {
        try {
          const json = JSON.parse(data) as GoldApiResponse;
          
          const pricePerGram = json.price_gram_24k;
          
          resolve(pricePerGram);
        } catch (err) {
          console.error('Failed to parse gold price:', err);
          reject(err);
        }
      });
    }).on('error', err => {
      console.error('Failed to fetch gold price:', err);
      reject(err);
    });
  });
}