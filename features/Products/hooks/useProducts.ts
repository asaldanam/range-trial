import useSWR from 'swr';

import { ProductsGetResponse } from '@/app/api/products/route';
import { api } from '@/lib/api';
import useQueryParameters from '@/lib/useQueryParameters';
import { ProductsProps } from '../Products';

export function useProducts() {
    const { search } = useQueryParameters();

    const { data, error, isLoading } = useSWR<ProductsGetResponse>(
        `api/products?${search}`, //
        api.get
    );

    return { data, error, isLoading };
}
