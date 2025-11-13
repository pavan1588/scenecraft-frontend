export type UserRole = "admin" | "user";

const ADMIN_EMAILS: string[] = [
  "pavanagnihotri82@gmail.com",      // primary owner/admin
  "business@scenecraft-ai.com"       // optional admin ID
];

export function getRoleForUser(email?: string | null): UserRole {
  if (!email) return "user";
  const normalized = email.toLowerCase();
  return ADMIN_EMAILS.includes(normalized) ? "admin" : "user";
}

export function isAdmin(email?: string | null): boolean {
  return getRoleForUser(email) === "admin";
}
