'use client';

import useSWR from 'swr';

import { ProductsFiltersGetResponse } from '@/app/api/products/[sectionId]/filters/route';
import Range from '@/components/ui/Range';
import { api } from '@/lib/api';
import { setSearchParams } from '@/lib/setSearchParams';
import S from './ProductsFilters.module.css';
import useQueryString from '@/lib/useQueryString';

export interface ProductsFiltersProps {
    sectionId: string;
}

export default function ProductsFilters(props: ProductsFiltersProps) {
    const { search } = useQueryString();
    const { data: filters } = useSWR<ProductsFiltersGetResponse>(
        `api/products/${props.sectionId}/filters`, //
        api.get
    );

    return (
        <div className={S.filters}>
            <p className={S.filtersTitle}>FILTERS</p>

            {filters?.price && (
                <Range
                    start={
                        search['price.greaterThanOrEqual'] ? parseFloat(search['price.greaterThanOrEqual']) : undefined
                    }
                    end={search['price.lessThanOrEqual'] ? parseFloat(search['price.lessThanOrEqual']) : undefined}
                    onChange={({ end, start }) => {
                        setSearchParams({
                            ...(start && { 'price.greaterThanOrEqual': String(start) }),
                            ...(end && { 'price.lessThanOrEqual': String(end) })
                        });
                    }}
                    className={S.range}
                    unit="€"
                    min={filters.price.min}
                    max={filters.price.max}
                    range={filters.price.range}
                />
            )}
        </div>
    );
}
