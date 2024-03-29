import { displayGeneralInformation } from './modules/generalModule';

const params: Record<string, string> = {
  page: '1',
  limit: '8',
};

displayGeneralInformation(params);
