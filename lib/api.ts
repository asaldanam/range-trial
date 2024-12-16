const { NEXT_PUBLIC_BASE_URL = 'http://localhost:8080' } = process.env;

export const api = {
    get: async <Data>(input: RequestInfo | URL, init?: Omit<RequestInit, 'method'>): Promise<Data> => {
        const response = await fetch(`${NEXT_PUBLIC_BASE_URL}/${input}`, { ...init, method: 'GET', cache: 'no-cache' });
        const data: Data = await response.json();

        return data;
    }
};
