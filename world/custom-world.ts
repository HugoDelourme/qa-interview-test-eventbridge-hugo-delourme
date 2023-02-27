import { setWorldConstructor } from '@cucumber/cucumber';

//Custom World to manage passing data through steps

export type ResponseData = {
  name: string;
  createdAt: string;
  companyId: string;
  amount: number;
  size: string;
}

export interface CucumberWorldConstructorParams {
  event: string;
  responseStatus: number;
  responseData: {[key: string]: any};
}

export class CustomWorld {
  public event: string;
  public responseStatus: number;
  public responseData: {[key: string]: any};

  constructor({ event, responseStatus, responseData }: CucumberWorldConstructorParams) {
    this.event = event;
    this.responseStatus = responseStatus;
    this.responseData = responseData;
  }
}

setWorldConstructor(CustomWorld);