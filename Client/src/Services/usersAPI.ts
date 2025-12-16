//const basePath = "https://jsonplaceholder.typicode.com/users";
//const basePath = "http://localhost:8080/api/users";
const basePath = "http://localhost:8080";

export function getUsers(path: string) {return fetch(basePath + path).then((data) => data.json())};