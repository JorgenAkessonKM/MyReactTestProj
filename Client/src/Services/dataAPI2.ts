function getItems2(path: string) {
  return fetch(path).then((data) => data.json());
}
export default getItems2;
