import {Injectable} from '@angular/core';
import {
    HttpRequest,
    HttpHandler,
    HttpEvent, HttpResponse
} from '@angular/common/http';
import {catchError, map, Observable, throwError} from 'rxjs';

@Injectable()
export class HttpInterceptor implements HttpInterceptor {

    constructor() {
    }

    intercept(request: HttpRequest<unknown>, next: HttpHandler): Observable<HttpEvent<unknown>> {
        request = request.clone({headers: request.headers.set('Content-Type', 'application/json')});
        request = request.clone({headers: request.headers.set('Accept', '*/*')});

        return next.handle(request).pipe(
            map((event: HttpEvent<any>) => {
                if (event instanceof HttpResponse) {
                    // TODO Remove when finish develop
                    console.log(event);
                }
                return event;
            }),
            catchError((error) => {
                console.log('err', error);
                return throwError(error);
            })
        );
    }
}

