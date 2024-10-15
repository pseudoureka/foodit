export async function getFoods({ order = "createdAt", cursor = "", limit = 6 }) {
  const query = `order=${order}&cursor=${cursor}&limit=${limit}`;
  const response = await fetch(`https://learn.codeit.kr/1841/foods?${query}`);
  const body = response.json();
  return body;
}
