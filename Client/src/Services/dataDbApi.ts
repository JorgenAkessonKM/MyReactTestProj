const basePath = "http://localhost:8080";

export interface DbData {
  id: string;
  type: string;
  data: string;
}

export async function getDbDataByType(type: string): Promise<DbData> {
  return fetch(basePath + `/api/db/data/${encodeURIComponent(type)}`)
    .then((res) => res.json())
    .then((res) => {
      return res as DbData;
    });
}
