import {HttpEvent, HttpHandler, HttpInterceptor, HttpRequest} from '@angular/common/http';
import {Observable} from 'rxjs';
import {HashUtil} from '../utility/hash.util';
import {EventEmitter} from '@angular/core';

const sessionStorageParamName = 'savedRequests';

/**The duration that no resubmitting is allowed, for example: if set to 5 seconds, user can not submit the
 * same form again in 5 seconds. The config unit is in seconds.*/
const postDataDurationMin = 2;

export class PreventDoubleSubmissionInterceptor implements HttpInterceptor {

  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    if (req.method === 'POST') {
      const bodyParams = req.serializeBody().toString();
      const ee = new EventEmitter<HttpEvent<any>>();

      HashUtil.getSha256(bodyParams).then((hashedBodyParams) => {
          const currentData = {
            hash: hashedBodyParams,
            date: Date.now()
          };

          let savedRequests = JSON.parse(sessionStorage.getItem(sessionStorageParamName));
          if (!savedRequests) {
            savedRequests = [];
          } else {
            const now = Date.now();
            for (const obj of savedRequests) {
              if ((obj.hash === hashedBodyParams) && (now - obj.date < postDataDurationMin * 1000)) {
                ee.error(new Error('DUPLICATE_REQUEST'));
                return;
              }
            }
          }
          savedRequests.push(currentData);
          sessionStorage.setItem(sessionStorageParamName, JSON.stringify(savedRequests));
          next.handle(req).subscribe(ee);
        }
      );
      return ee;
    } else {
      return next.handle(req);
    }
  }
}
