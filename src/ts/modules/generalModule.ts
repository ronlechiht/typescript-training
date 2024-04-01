//Import modules
import { HttpService } from '../services/httpServices';
import { GeneralInformation } from '../types/generalInformationType';

//General information HTML DOM elements
const totalCustomers = document.querySelector('.customers-quantity')!;
const totalActiveCustomers = document.querySelector('.active-quantity')!;

const generalApi: string = process.env.API_URL + '/general';

//Get general information from API
async function getGeneralInformation(
  params: Record<string, string>,
): Promise<GeneralInformation> {
  const res = await HttpService.get(generalApi, params);
  const totalCustomers = res[0]['totalCustomers'];
  const totalActiveCustomers = res[0]['totalActiveCustomers'];
  return { totalCustomers, totalActiveCustomers };
}

//Display general information in general table
export async function displayGeneralInformation(
  params: Record<string, string>,
): Promise<void> {
  const generalInformation = await getGeneralInformation(params);

  totalCustomers.innerHTML = generalInformation.totalCustomers;
  totalActiveCustomers.innerHTML = generalInformation.totalActiveCustomers;
}
