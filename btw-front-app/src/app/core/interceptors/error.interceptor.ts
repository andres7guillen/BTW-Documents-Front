import { HttpErrorResponse, HttpInterceptorFn } from '@angular/common/http';
import Swal from 'sweetalert2';
import { catchError, throwError } from 'rxjs';

export const errorInterceptor: HttpInterceptorFn = (req, next) => {
  return next(req).pipe(
    catchError((error: HttpErrorResponse) => {
      let message = 'Error inesperado';

      if (error.error) {
        if (typeof error.error === 'string') {
          message = error.error;
        } else if (error.error.error) {
          message = error.error.error;
        }
      }

      Swal.fire({
        icon: 'error',
        title: 'Error',
        text: message,
      });

      return throwError(() => error);
    }),
  );
};
