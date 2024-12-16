'use client';

import Range from '@/components/ui/Range';
import { useProductsFilters } from '../../hooks/useProductsFilters';
import S from './ProductsFilters.module.css';
import useQueryParameters from '@/lib/useQueryParameters';

export interface ProductsFiltersProps {
    sectionId: string;
}

export default function ProductsFilters(props: ProductsFiltersProps) {
    const query = useQueryParameters();
    const filters = useProductsFilters(props);

    return (
        <div className={S.filters}>
            <p className={S.filtersTitle}>FILTERS</p>

            {filters.parameters?.price && (
                <Range
                    onChange={({ end, start }) => {
                        query.push({
                            ...(start && { 'price.greaterThanOrEqual': String(start) }),
                            ...(end && { 'price.lessThanOrEqual': String(end) })
                        });
                    }}
                    className={S.range}
                    unit="€"
                    min={filters.parameters.price.min}
                    max={filters.parameters.price.max}
                    range={filters.parameters.price.range}
                />
            )}
        </div>
    );
}
