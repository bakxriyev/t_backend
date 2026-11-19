import { ExecutionContext, Injectable } from '@nestjs/common';
import { ThrottlerGuard } from '@nestjs/throttler';

/**
 * Rate limiting only where it protects something (login, admin writes).
 * Public reads and lead submissions are never limited: the site proxies all
 * visitors through one Next.js server, so a per-IP limit would hit every
 * visitor at once during ad campaigns and drop real leads.
 */
@Injectable()
export class AppThrottlerGuard extends ThrottlerGuard {
  protected async shouldSkip(context: ExecutionContext): Promise<boolean> {
    const req = context.switchToHttp().getRequest<{ method?: string; path?: string; url?: string }>();
    const method = (req.method || '').toUpperCase();
    if (method === 'GET' || method === 'HEAD' || method === 'OPTIONS') return true;
    const path = (req.path || req.url || '').split('?')[0].replace(/\/+$/, '');
    if (method === 'POST' && /\/courses$/.test(path)) return true; // lead form
    return super.shouldSkip(context);
  }
}
