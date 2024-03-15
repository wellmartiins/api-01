import { CallHandler, ExecutionContext, NestInterceptor } from "@nestjs/common";
import { Observable, tap } from "rxjs";

export class LogInterceptors implements NestInterceptor {

    intercept(context: ExecutionContext, next: CallHandler): Observable<any> {

        const dt = Date.now()

        const request = context.switchToHttp().getRequest(); // log da url executada

        return next.handle().pipe(tap(() => {
            console.log(`URL: ${request.url} `);
            console.log(`Execucao levou ${Date.now() - dt } milisegundos`);
        }))
        
    }
}