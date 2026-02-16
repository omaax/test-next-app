async function getData() {
    const url = "https://jsonplaceholder.typicode.com/users";
    try {
        const response = await fetch(url, { cache: "no-store" })
        if (!response.ok) {
            const status = response.status || response.statusCode || "unknown";
            throw new Error(`Failed to fetch. Status: ${status}`);
        }

        const result = await response.json();
        return result;
    } catch (error) {
        console.error(error.message);
        return []; // return empty array on error to avoid crashing
    }
}

getData().then(users => {
    users.forEach(user => console.log(user.name));
});
