import { Suspense } from 'react';
import Products, { ProductsProps } from './Products';

export default (props: ProductsProps) => (
    <Suspense>
        <Products {...props} />
    </Suspense>
);
