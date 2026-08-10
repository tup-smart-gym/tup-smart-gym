import { HttpInterceptorFn } from '@angular/common/http';
import { inject } from '@angular/core';
import { AuthService } from '@auth0/auth0-angular';
import { switchMap } from 'rxjs';

const isApiRequest = (url: string): boolean =>
  url.includes('smartgymback-production-8639.up.railway.app') || url.includes('localhost:3000');

export const authInterceptor: HttpInterceptorFn = (req, next) => {
  const auth = inject(AuthService);

  if (!isApiRequest(req.url)) {
    return next(req);
  }

  return auth.getAccessTokenSilently().pipe(
    switchMap((token) => {
      const authReq = req.clone({
        setHeaders: { Authorization: `Bearer ${token}`, 'ngsw-bypass': 'true' },
      });
      return next(authReq);
    }),
  );
};
