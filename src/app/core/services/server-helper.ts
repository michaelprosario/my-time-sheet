import { environment } from "src/environments/environment";

export class ServerHelper
{
  static getApiUrl()
  {
    if(!environment.production){
      return environment.API_URL;
    } else {      
      let parts = window.location.href.split('/');
      return parts[0] + "//" + parts[2];
    }
  }
}
