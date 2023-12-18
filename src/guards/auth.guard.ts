import { Injectable, CanActivate, ExecutionContext } from '@nestjs/common';
import { Observable } from 'rxjs';
import * as jwt from 'jsonwebtoken';
import { Request as ExpressRequest } from 'express';

@Injectable()
export class AuthGuard implements CanActivate {
  private getPublicKey(jwtVerificationKey: string | undefined) {
    //Format jwt verification key to add spaces to form correct pem file
    const splitPem = jwtVerificationKey.match(/.{1,64}/g) as string[];

    return (
      '-----BEGIN PUBLIC KEY-----\n' +
      splitPem.join('\n') +
      '\n-----END PUBLIC KEY-----'
    );
  }

  canActivate(
    context: ExecutionContext,
  ): boolean | Promise<boolean> | Observable<boolean> {
    const request = context.switchToHttp().getRequest() as ExpressRequest;
    const token = request.cookies.jwt;

    console.log(token);
    if (!token) {
      return false;
    }

    try {
      const response = jwt.verify(
        token,
        this.getPublicKey(process.env['CLERK_JWT_VERIFICATION_KEY']),
      ) as jwt.JwtPayload;

      console.log(response.userId);
    } catch (e) {
      console.error(e);
      return false;
    }

    return true;
  }
}
