export function symbol2Description(symbol: string) {
  switch (symbol) {
    case "x":
      return "Present";
    case "/":
      return "Absent";
    case "o":
      return "Excused";
    default:
      return "Unknown";
  }
}

export function symbol2color(symbol: string) {
  switch (symbol) {
    case "x":
      return "green";
    case "/":
      return "red";
    case "o":
      return "amber";
    default:
      return "white";
  }
}
