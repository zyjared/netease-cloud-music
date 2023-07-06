export function formatCount(n: number, unitCount: number = 0) {
  const units = ["", "万", "亿"];
  if (n < 10000) {
    return n.toFixed(1) + units[unitCount];
  } else {
    return formatCount(n / 10000, unitCount + 1);
  }
}
