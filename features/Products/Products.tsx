'use client';

import Image from 'next/image';
import S from './Products.module.css';
import ProductsFilters from './components/ProductsFilters';

import { useProducts } from './hooks/useProducts';

export interface ProductsProps {
    sectionId: string;
}

export default function Products(props: ProductsProps) {
    const products = useProducts();

    const list = products.data?.content;

    return (
        <main className={S.main}>
            <aside className={S.aside}>
                <ProductsFilters sectionId={props.sectionId} />
            </aside>

            <section>
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
