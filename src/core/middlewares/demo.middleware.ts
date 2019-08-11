import { Injectable, NestMiddleware } from '@nestjs/common';
import { equal } from 'assert';

@Injectable()
export class DemoMiddleware implements NestMiddleware {
  use(req: any, res: any, next: () => void) {
    console.log('http connecting...');
    req.user = {
      roles: [
        'guest',
      ],
    };
    if (req.header['X-Demo'] === 'secret') {
      req.user = {
        roles: [
          'member',
        ],
      };
    }

    next();
  }
}
