export const dynamic = 'force-dynamic';

export type ProductsFiltersGetResponse = {
    price: {
        min?: number;
        max?: number;
        range?: number[];
    };
};

type Route = { params: Promise<{ sectionId: string }> };

export async function GET(_: Request, { params }: Route) {
    const { sectionId } = await params;

    const data: ProductsFiltersGetResponse = {
        price: {
            ...(sectionId === 'exercise1' && {
                min: 1,
                max: 100
            }),
            ...(sectionId === 'exercise2' && {
                range: [1.99, 5.99, 10.99, 30.99, 50.99, 70.99]
            })
        }
    };

    return Response.json(data);
}
