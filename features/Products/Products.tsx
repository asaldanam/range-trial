'use client';

import Image from 'next/image';
import useSWR from 'swr';

import { ProductsGetResponse } from '@/app/api/products/route';
import { api } from '@/lib/api';
import useQueryString from '@/lib/useQueryString';
import S from './Products.module.css';
import ProductsFilters from './components/ProductsFilters';

export interface ProductsProps {
    products: ProductsGetResponse;
    sectionId: string;
}

export default function Products(props: ProductsProps) {
    const { qs } = useQueryString();

    const { data: products, isLoading } = useSWR<ProductsGetResponse>(
        `api/products${qs}`, //
        api.get,
        { fallbackData: props.products }
    );

    const list = products?.content;

    return (
        <main className={S.main}>
            <aside className={S.aside}>
                <ProductsFilters sectionId={props.sectionId} />
            </aside>

            <section>
                {!isLoading && list?.length === 0 && <p className={S.noProducts}>No products found</p>}
                <ul className={S.products}>
                    {list?.map((product) => (
                        <li key={product.id} className={S.product}>
                            <Image
                                className={S.productImage}
                                src={product.image.url}
                                alt={product.name}
                                width={600}
                                height={300}
                            />
                            <p className={S.productName}>{product.name}</p>
                            <p className={S.productPrice}>{product.price}€</p>
                        </li>
                    ))}
                </ul>
            </section>
        </main>
    );
}
