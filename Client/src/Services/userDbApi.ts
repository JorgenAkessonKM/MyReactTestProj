export interface DbUser {
  name: string;
  token: string;
  region: string;
}

export async function getDbUserByName(name: string): Promise<DbUser> {
  const response = await fetch(`/api/db/users/${encodeURIComponent(name)}`);
  if (!response.ok) {
    const message = await response.text();
    throw new Error(message || "Failed to get user from database");
  }

  return response.json();
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
