import ProductsFixture from './products.fixture.json';

export type ProductsGetResponse = {
    content: Array<{
        id: string;
        name: string;
        price: number;
        image: {
            url: string;
        };
    }>;
};

export async function GET(request: Request) {
    const searchParams = new URLSearchParams(request.url.split('?')[1]);
    const search = Object.fromEntries(searchParams.entries());

    const data: ProductsGetResponse = {
        content: ProductsFixture
            //
            .filter((product) => {
                if (search['price.greaterThanOrEqual']) {
                    return product.price >= Number(search['price.greaterThanOrEqual']);
                }
                return true;
            })
            //
            .filter((product) => {
                if (search['price.lessThanOrEqual']) {
                    return product.price <= Number(search['price.lessThanOrEqual']);
                }
                return true;
            })
    };

    return Response.json(data);
}
