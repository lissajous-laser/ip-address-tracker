export async function apiCall(getUrl: string) {
  try {
    const response = await fetch(getUrl);

    if (response.ok) {
      return response.json();
    }
  } catch (err) {
    console.log(err);
  }
}