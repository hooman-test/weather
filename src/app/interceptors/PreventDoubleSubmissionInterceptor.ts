import {HttpEvent, HttpHandler, HttpInterceptor, HttpRequest} from '@angular/common/http';
import {EMPTY, Observable} from 'rxjs';
import {AES} from 'crypto-ts';

const sessionStorageParamName = 'savedRequests';

/**The duration that no resubmitting is allowed, for example: if set to 5 seconds, user can not submit the
 * same form again in 5 seconds. The config unit is in seconds.*/
const postDataDurationMin = 10;

export class PreventDoubleSubmissionInterceptor implements HttpInterceptor {

  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    if (req.method === 'POST') {
      // Encrypt body parameters to store in sessionStorage
      // const encryptedBodyParams = AES.encrypt(JSON.stringify(req.body), 'test').toString();
      const encryptedBodyParams = JSON.stringify(req.body);
      const currentData = {
        hash: encryptedBodyParams,
        date: Date.now()
      };

      let decryptedDataArray = JSON.parse(sessionStorage.getItem(sessionStorageParamName));
      if (!decryptedDataArray) {
        decryptedDataArray = [];
      } else {
        const now = Date.now();
        for (const obj of decryptedDataArray) {
          if ((obj.hash === encryptedBodyParams) && (now - obj.date < postDataDurationMin * 1000)) {
            console.log('Double Submission Detected!');
            return EMPTY;
          }
        }
      }
      decryptedDataArray.push(currentData);
      sessionStorage.setItem(sessionStorageParamName, JSON.stringify(decryptedDataArray));
    }
    return next.handle(req);
  }
}
