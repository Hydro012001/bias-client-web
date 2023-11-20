export function MaskEmail(email) {
  const [username, domain] = email.split("@");
  const maskUsername = username.slice(0, 2) + "*****";
  return `${maskUsername}@${domain}`;
}
