import { GENERAL_API } from '../constants/constants';
import { GeneralInformation } from '../types/generalInformationType';
import { HttpService } from './httpServices';

export class GeneralInformationService {
  service = new HttpService(GENERAL_API);

  async getGeneralInformation() {
    const res = await this.service.get<GeneralInformation[]>();
    return res[0] as GeneralInformation;
  }
}
