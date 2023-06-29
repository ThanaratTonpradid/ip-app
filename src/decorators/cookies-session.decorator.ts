import { createParamDecorator, ExecutionContext } from '@nestjs/common';
import { Request } from 'express';
import * as parseurl from 'parseurl';

export const cookieSessionFactory = (
  data: string,
  req: ExecutionContext,
) => {
  const ctx = req.switchToHttp();
  const request = ctx.getRequest<Request>();
  const session = request.session as Record<string, any>;
  if (!session.views) {
    session.views = {};
  }
  const pathname = parseurl(request).pathname;
  session.views[pathname] = (session.views[pathname] || 0) + 1
  const cookies = request.cookies as Record<string, string>;
  return data ? cookies && cookies[data] : cookies;
};

export const CookieSession = createParamDecorator(cookieSessionFactory);
