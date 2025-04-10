export interface ProductImage {
    yellow: string;
    rose: string;
    white: string;
}

export interface Product {
    name: string;
    popularityScore: number;
    weight: number;
    images: ProductImage;
    price: number;
}
