import { NextResponse } from 'next/server';
import { getProductsData } from '@/lib/product-data';
import { getGoldPrice } from '@/lib/gold-price';
import { Product } from '@/types/product';

export async function GET() {
  try {
    const products = getProductsData();
    const goldPrice = await getGoldPrice();

    const productsWithPrice: Product[] = products.map(product => ({
      ...product,
      price: +(product.weight * (product.popularityScore + 1) * goldPrice).toFixed(2),
    }));

    return NextResponse.json(productsWithPrice);
  } catch (err) {
    console.log(err)
    return NextResponse.json({ message: 'Failed to load product data' }, { status: 500 });
  }
}
