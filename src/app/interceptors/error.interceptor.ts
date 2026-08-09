import { HttpErrorResponse, HttpInterceptorFn } from "@angular/common/http";
import { catchError, throwError } from "rxjs";

export const errorInterceptor: HttpInterceptorFn = (req, next) => {
    return next(req).pipe(
        catchError((err: HttpErrorResponse) => {
            if(err.status === 401) {
                alert('Tu sesion no es valida. Inicia sesion nuevamente.');
            } else if (err.status === 403) {
                alert('No tenes permisos para realizar esta accion.');
            }
            return throwError(() => err);
        })
    )
}