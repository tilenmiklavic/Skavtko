export function isEmpty(object: any) {
  return Object.keys(object).length === 0;
}

export function isValid(element: any) {
  if (element === "undefined") {
    return false;
  }

  if (element === undefined) {
    return false;
  }

  if (!element) {
    return false;
  }

  if (element == null) {
    return false;
  }

  return true;
}

export function capitalize(text: string): string {
  return text.charAt(0).toUpperCase() + text.slice(1);
}
