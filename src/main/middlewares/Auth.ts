import { adaptMiddleware } from '@/main/adapters/ExpressMiddlewareAdapter';
import { makeAuthMiddleware } from '@/main/factories/middlewares/AuthMiddlewareFatory';

export const auth = adaptMiddleware(makeAuthMiddleware());