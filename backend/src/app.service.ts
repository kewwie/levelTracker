import { Injectable } from '@nestjs/common';

@Injectable()
export class AppService {
  getHello(): string {
    return 'Hello World!';
  }

  getKew(): string {
    return "This service was created by k3wwie";
  }
}
