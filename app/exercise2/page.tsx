import { api } from '@/lib/api';
import Products from 'features/Products';
import { ProductsGetResponse } from '../api/products/route';

export default async function Page() {
    const products = await api.get<ProductsGetResponse>('api/products');

    return <Products products={products} sectionId="exercise2" />;
}
