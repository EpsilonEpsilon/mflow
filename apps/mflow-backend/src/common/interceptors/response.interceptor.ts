import {
  CallHandler,
  ExecutionContext,
  Injectable,
  NestInterceptor,
} from '@nestjs/common';
import { map, Observable } from 'rxjs';
import { IRequestResponse } from '@repo/types';

@Injectable()
export class ResponseInterceptor<T>
  implements NestInterceptor<T, IRequestResponse<T>>
{
  intercept(
    context: ExecutionContext,
    next: CallHandler,
  ): Observable<IRequestResponse<T>> {
    return next.handle().pipe(
      map((data) => ({
        status: 'success',
        data: data ?? null,
      })),
    );
  }
}
