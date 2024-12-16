import useSWR from 'swr';

import { ProductsGetResponse } from '@/app/api/products/route';
import useQueryParameters from '@/lib/useQueryParameters';
import { api } from '@/lib/api';

export function useProducts() {
    const { search } = useQueryParameters();

    const { data, error, isLoading } = useSWR<ProductsGetResponse>(
        `api/products?${search}`, //
        api.get
    );

    return { data, error, isLoading };
}
