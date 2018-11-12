import {HttpEvent, HttpHandler, HttpInterceptor, HttpRequest} from '@angular/common/http';
import {Observable} from 'rxjs';
import {HashUtil} from '../utility/hash.util';
import {EventEmitter} from '@angular/core';

const sessionStorageParamName = 'savedRequests';

/**The duration that no resubmitting is allowed, for example: if set to 3 seconds, user can not submit the
 * same form again in 3 seconds. The config unit is seconds.*/
const postDataDuration = 3;

export class DoubleSubmissionInterceptor implements HttpInterceptor {

  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    if (req.method === 'POST') {
      const bodyParams = req.serializeBody().toString();
      const requestEvent = new EventEmitter<HttpEvent<any>>();
      let requestPath;
      try {
        requestPath = (new URL(req.url)).pathname;
      } catch (e) {
        requestPath = req.url;
      }
      const dataToBeHash = 'body: ' + bodyParams + ', url: ' + requestPath;
      HashUtil.getSha256(dataToBeHash).then(hashedBodyParams => {
          const currentData = {
            url: requestPath,
            hash: hashedBodyParams,
            date: Date.now()
          };

          let savedRequests = JSON.parse(sessionStorage.getItem(sessionStorageParamName));
          if (savedRequests) {
            const now = Date.now();
            for (const obj of savedRequests) {
              if ((obj.hash === hashedBodyParams) && (now - obj.date < postDataDuration * 1000)) {
                requestEvent.error(new Error('DUPLICATE_REQUEST_EXCEPTION'));
                return;
              }
            }
          } else {
            savedRequests = [];
          }
          savedRequests.push(currentData);
          sessionStorage.setItem(sessionStorageParamName, JSON.stringify(savedRequests));
          next.handle(req).subscribe(requestEvent);
        }
      ).catch(() => {
        /*because of IE bug, for some requests hashing may not work properly, so for those requests double submission
        won't work*/
        next.handle(req).subscribe(requestEvent);
      });

      return requestEvent;
    } else {
      return next.handle(req);
    }
  }
}
