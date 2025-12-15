const basePath = "https://jsonplaceholder.typicode.com/users";

export const getUsers = () => fetch(basePath).then((data) => data.json());