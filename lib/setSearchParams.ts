export const setSearchParams = (parameters: Record<string, string>) => {
    const search = new URLSearchParams(window.location.search);

    for (const [key, value] of Object.entries(parameters)) {
        search.set(key, value);
    }

    window.history.pushState({}, '', `${window.location.pathname}?${search}`);
};
