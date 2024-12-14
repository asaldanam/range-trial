export type Exercise1GetResponse = {
    min: number;
    max: number;
};

export async function GET() {
    const data: Exercise1GetResponse = { min: 1, max: 100 };

    return Response.json(data);
}
