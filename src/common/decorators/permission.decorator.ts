import { applyDecorators, SetMetadata, UseGuards } from '@nestjs/common';
import { createParamDecorator, ExecutionContext } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
// import { defaultAdminUserId, defaultAccountId } from '../app.constants';


export const CurrentUser = createParamDecorator(
  (data: never, context: ExecutionContext) => {
    const request = context.switchToHttp().getRequest();
    // return request.user;

    console.log('current user  =>', request.user);
    if (!request.user) {
      request.user = {};
    }

    // if (!request.user.id) {
    //   request.user.id = defaultAdminUserId;
    // }

    // if (!request.user.account_id) {
    //   request.user.account_id = defaultAccountId;
    // }
    return request.user;
  },
);

export function Action(action: string) {
  return applyDecorators(
    SetMetadata('action', action),
  );
}
