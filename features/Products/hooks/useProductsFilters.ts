import useSWR from 'swr';

import { ProductsFiltersGetResponse } from '@/app/api/products/[sectionId]/filters/route';
import { ProductsProps } from '../Products';
import { api } from '@/lib/api';

export function useProductsFilters(props: ProductsProps) {
    const { data: parameters } = useSWR<ProductsFiltersGetResponse>(
        `api/products/${props.sectionId}/filters`, //
        api.get
    );

    return {
        parameters
    };
}
