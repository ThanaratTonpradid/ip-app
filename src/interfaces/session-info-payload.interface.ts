export interface SessionInfoPayload {
  cookies: string | Record<string, any>;
  session: Record<string, any>;
  siteId: number;
}
