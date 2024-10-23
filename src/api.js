const BASE_URL = "https://learn.codeit.kr/1862/foods";

export async function getFoods({ order = "createdAt", cursor = "", limit = 6, search = "" }) {
  const query = `order=${order}&cursor=${cursor}&limit=${limit}&search=${search}`;
  const response = await fetch(`${BASE_URL}?${query}`);
  if (!response.ok) {
    throw new Error("정보를 불러오는데 실패했습니다.");
  }
  const body = response.json();
  return body;
}

export async function createFood(formData) {
  const response = await fetch(`${BASE_URL}`, {
    method: "POST",
    body: formData,
  });
  if (!response.ok) {
    throw new Error("정보를 생성하는데 실패했습니다.");
  }
  const body = response.json();
  return body;
}
