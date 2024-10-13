export function routes(): string[] {
  return ["/", "/finance", "/on", "/statistics", "/settings"];
}

export function route2Index(route: string): number {
  const routes: { [key: string]: number } = {
    "/": 0,
    "/finance": 1,
    "/on": 2,
    "/statistics": 3,
    "/settings": 4,
  };


  // Use the type-safe way of accessing object properties
  if (routes.hasOwnProperty(route)) {
    return routes[route];
  }

  return -1;
}
