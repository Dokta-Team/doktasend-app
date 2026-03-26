
import countriesData from './countries.json';

export async function GET() {
  // const res = await fetch('https://www.apicountries.com/countries');
  // const data = await res.json();
  // return Response.json(data);
  return Response.json(countriesData.countries);
}
