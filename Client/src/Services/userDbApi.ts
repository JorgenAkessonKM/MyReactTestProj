export interface DbUser {
  name: string;
  token: string;
  region: string;
}

export async function getDbUserByName(name: string): Promise<DbUser> {
  return fetch(`/api/db/users/${encodeURIComponent(name)}`)
    .then((res) => res.json())
    .then((res) => {
      return res as DbUser;
    });
}

export async function upsertDbUser(user: DbUser): Promise<void> {
  const response = await fetch("/api/db/users", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(user),
  });

  if (!response.ok) {
    const message = await response.text();
    throw new Error(message || "Failed to save user to database");
  }
}
