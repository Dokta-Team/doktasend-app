export async function GET() {
  const res = await fetch('https://www.apicountries.com/countries');
  const data = await res.json();

  return Response.json(data);
}
