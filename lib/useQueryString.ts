import { useSearchParams } from 'next/navigation';

export default function useQueryString() {
    const searchParams = useSearchParams();

    const qs = searchParams ? `?${searchParams}` : '';
    const search = Object.fromEntries(searchParams);

    return {
        search,
        qs
    };
}
