export function isEmpty(object: any) {
  return Object.keys(object).length === 0;
}

export function isValid(element: any) {
  if (element === "undefined"){
    return false;
  }

  if (element == undefined) {
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