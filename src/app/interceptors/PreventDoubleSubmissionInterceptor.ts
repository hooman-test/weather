import {HttpEvent, HttpHandler, HttpInterceptor, HttpRequest} from '@angular/common/http';
import {EMPTY, Observable} from 'rxjs';
import {HashUtil} from '../utility/hash.util';

const sessionStorageParamName = 'savedRequests';

/**The duration that no resubmitting is allowed, for example: if set to 5 seconds, user can not submit the
 * same form again in 5 seconds. The config unit is in seconds.*/
const postDataDurationMin = 10;

export class PreventDoubleSubmissionInterceptor implements HttpInterceptor {

  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    if (req.method === 'POST') {
      const hashUtility = new HashUtil();
      const bodyParams = req.serializeBody().toString();

      console.log('first');

      let hashedBodyParams;
      hashUtility.getSha256(bodyParams).then((h) =>
        hashedBodyParams = h
      );

      console.log('second');
      console.log(bodyParams);
      console.log(hashedBodyParams);
      // Encrypt body parameters to store in sessionStorage
      const currentData = {
        hash: hashedBodyParams,
        date: Date.now()
      };

      let decryptedDataArray = JSON.parse(sessionStorage.getItem(sessionStorageParamName));
      if (!decryptedDataArray) {
        decryptedDataArray = [];
      } else {
        const now = Date.now();
        for (const obj of decryptedDataArray) {
          if ((obj.hash === hashedBodyParams) && (now - obj.date < postDataDurationMin * 1000)) {
            console.log('Double Submission Detected!');
            return EMPTY;
          }
        }
      }
      decryptedDataArray.push(currentData);
      sessionStorage.setItem(sessionStorageParamName, JSON.stringify(decryptedDataArray));
    }
    console.log('third');
    return next.handle(req);
  }
}
