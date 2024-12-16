import useSWR from 'swr';

import { Exercise1GetResponse } from '@/app/api/exercise1/route';
import { api } from '@/lib/api';

import { ProductsProps } from '../Products';
import { ProductsFiltersGetResponse } from '@/app/api/products/[sectionId]/filters/route';

export function useProductsFilters(props: ProductsProps) {
    const { data: parameters } = useSWR<ProductsFiltersGetResponse>(
        `api/products/${props.sectionId}/filters`, //
        api.get
    );

    return {
        parameters
    };
}
