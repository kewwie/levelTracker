import { Controller, Get, Query } from '@nestjs/common';
import { AppService } from './app.service';

@Controller()
export class AppController {
    constructor(private readonly appService: AppService) {}

    @Get()
    get() {
        return this.appService.get();
    }

    @Get("level")
    getLevel(@Query("level") level: string) {

        if (!level) {
            return {"message": "Missing level"};
        }

        return this.appService.getLevel(level);
    }
}
