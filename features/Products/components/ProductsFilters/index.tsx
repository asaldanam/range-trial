import { Suspense } from 'react';
import ProductsFilters, { ProductsFiltersProps } from './ProductsFilters';

export default (props: ProductsFiltersProps) => (
    <Suspense>
        <ProductsFilters {...props} />
    </Suspense>
);
