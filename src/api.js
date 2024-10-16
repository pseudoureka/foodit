export async function getFoods({ order = "createdAt", cursor = "", limit = 6, search = "" }) {
  const query = `order=${order}&cursor=${cursor}&limit=${limit}&search=${search}`;
  const response = await fetch(`https://learn.codeit.kr/1841/foods?${query}`);
  if (!response.ok) {
    throw new Error("정보를 불러오는데 실패했습니다.");
  }
  const body = response.json();
  return body;
}
