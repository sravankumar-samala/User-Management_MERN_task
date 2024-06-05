const colorsList = [
  "#430a5d",
  "#240750",
  "#6d3405",
  "#791142",
  "#116d6e",
  "#735f32",
  "#082a56",
  "#1e5128",
  "#065f36",
  "#d89216",
  "#323232",
  "#690707",
];
export default function chooseRandomColor() {
  const index = Math.floor(Math.random() * colorsList.length);
  return colorsList[index];
}
