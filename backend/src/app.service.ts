import { Injectable } from '@nestjs/common';

@Injectable()
export class AppService {
    get() {
        return { "hello": "world" };
    }

    getLevel(level: string) {
        var totalXp = 0;

        function forLevel(level) {
            var levelXp = 100;
            for (let lvl = 1; lvl < (level); lvl++) { 
                levelXp = levelXp + (45 + (10 * lvl))
            }
            return levelXp;
        }
        
        for (let lvl = 1; lvl < (Number(level) + 1); lvl++) { 
            totalXp = totalXp + (forLevel(lvl));
        }

        return { xp: totalXp, level };
    }
}
