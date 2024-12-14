const { BASE_URL = 'http://localhost:8080' } = process.env;

export const api = {
    get: async <Data>(
        input: RequestInfo | URL,
        init?: Omit<RequestInit, 'method'>
    ): Promise<
        | {
              data: null;
              response: Response;
              ok: false;
          }
        | {
              data: Data;
              response: Response;
              ok: true;
          }
    > => {
        const url = BASE_URL + input;
        const response = await fetch(url, { ...init, method: 'GET', cache: 'no-cache' });
        const data: Data = await response.json();

        if (response.ok === false) {
            return {
                data: null,
                response,
                ok: response.ok
            };
        }

        return { data, response, ok: response.ok };
    }
};
