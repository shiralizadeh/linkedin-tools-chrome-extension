export const generateKey = () =>
  `linkedin-tools-notes-${extractUsername(window.location.href)}`;

export function extractUsername(url: string) {
  const linkedInUsernameRegex = /linkedin\.com\/in\/([a-zA-Z0-9-]+)\/?/;
  const username = url.match(linkedInUsernameRegex)?.[1];

  return username!;
}
