export type UserRole = "admin" | "user";

const ADMIN_EMAILS: string[] = ["pavanagnihotri82@gmail.com"];

/**
 * Returns "admin" or "user" based on the signed-in email.
 */
export function getUserRole(email?: string | null): UserRole {
  if (!email) return "user";
  const normalized = email.toLowerCase();
  return ADMIN_EMAILS.includes(normalized) ? "admin" : "user";
}

/**
 * Convenience helper to check if the user is admin.
 */
export function isAdmin(email?: string | null): boolean {
  return getUserRole(email) === "admin";
}

/**
 * Optional label helper for UI badges.
 */
export function roleLabel(role: UserRole): string {
  return role === "admin" ? "Admin" : "Member";
}
