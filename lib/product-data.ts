import fs from 'fs';
import path from 'path';
import { Product } from '../types/product';

const dataFilePath = path.join(process.cwd(), 'data/products.json');

export function getProductsData(): Product[] {
  try {
    const jsonData = fs.readFileSync(dataFilePath, 'utf8');
    return JSON.parse(jsonData);
  } catch (error) {
    console.error('Error reading products data:', error);
    return [];
  }
}