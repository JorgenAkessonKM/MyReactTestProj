const basePath = "http://localhost:8080";

export interface DbData {
  id: string;
  data: string;
}

export async function getDbDataById(id: string): Promise<DbData> {
  return fetch(basePath + `/api/db/data/${encodeURIComponent(id)}`)
    .then((res) => res.json())
    .then((res) => {
      return res as DbData;
    });
}
