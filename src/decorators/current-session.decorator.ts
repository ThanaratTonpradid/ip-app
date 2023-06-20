import { createParamDecorator, ExecutionContext } from '@nestjs/common';

export const currentSessionFactory = (
  data: string,
  req: ExecutionContext,
): Express.Locals => {
  const request = req.switchToHttp().getRequest();
  const session = request.user as Record<string, string>;
  return data ? session && session[data] : session;
};

export const CurrentSession = createParamDecorator(currentSessionFactory);
