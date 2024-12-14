export type Exercise2GetResponse = {
    range: number[];
};

export async function GET() {
    const data: Exercise2GetResponse = { range: [1.99, 5.99, 10.99, 30.99, 50.99, 70.99] };

    return Response.json(data);
}
