class RunnerCanvasGame extends CanvasGame
{
    constructor(bottom)
    {
        super();
        this.bottom = bottom;
        this.counter = 0;
        this.objects = [];
        this.isObstaclePlaced = false;
        this.obstacleInterval = 15;
        this.currentBreakpoint;
        this.lastBreakpointReached = 0;
        this.speed = 0.7;
    }

    collisionDetection()
    {
        //  Update breakpoint state
        this.updateConfig();

        //  Collision Detection - universal
        Array.isArray(this.objects) && this.objects.map((item, index) => {
            if(!gameObjects[item].isOutOfScreen()){
                this.touchObstacleLogic(item);
            }
        });

        //  OBSTACLE PLACING LOGIC
        {
            if(gameObjects[score].getPoints() % this.obstacleInterval == 0 && this.isObstaclePlaced == false){
                let rand = Math.random();
    
                switch(true){
                    case rand < 0.1: // 10% extra life
                        this.addObject(1, false);
                        break;
                    case rand < 0.15: // 15% extra points
                        this.addObject(2, false);
                        break;
                    case rand < 1:  // rest% dmg
                        this.addObject(3, false);
                        switch(true){
                            case rand < 0.1:
                                this.addObject(2, true);
                                break;
                            case rand < 0.2:
                                this.addObject(1, true);
                                break;
                        }
                        break;
                }
                this.isObstaclePlaced = true;
            }
            if(gameObjects[score].getPoints() % this.obstacleInterval == 1){
                this.isObstaclePlaced = false;
            }
        }

        //  
    }

    render()
    {
        super.render();
    } 

    // Floating parts to collect can be also handled by this function
    touchObstacleLogic(element){
        gameObjects[element].getPosition().forEach( (item) => {
            if(gameObjects[runner].touch(item.x, item.y)){
                if(!gameObjects[element].getTouched()){
                    let effect = gameObjects[element].getEffect();
                    let effectValue = gameObjects[element].getEffectValue();
                    switch(effect){
                        case 'extraPoints':
                            gameObjects[score].extraPoints(effectValue);
                            gameObjects[element].stopAndHide();
                            console.log(`+${effectValue} extra points`);
                            break;
                        case 'damage':
                            gameObjects[lifes].takeLife();
                            console.log('-1 life');
                            if(gameObjects[lifes].getLife() == 0){
                                console.log('DEAD');
                                console.log('Game is over!');
                                this.stopAll();
                            }
                            break;
                        case 'extraLife':
                            gameObjects[lifes].addLife();
                            gameObjects[element].stopAndHide();
                            console.log('gain +1 extra life');
                            break;
                    }
                    gameObjects[element].setTouched(true);
                }
            }
        });

    }
    stopAll(){
        gameObjects.forEach((item) => {
            item.stop();
        });
    }

    addObject(type = 3, fly = true){
        const HEAL = 'extraLife';       //  1
        const POINTS = 'extraPoints';   //  2
        const DMG = 'damage';           //  3

        let obstacleImage1 = new Image();
        obstacleImage1.src = "images/obstacle1.png";
        
        switch(type){
            case 1:
                fly ?
                gameObjects[20 + this.counter] = new Obstacle(lifeImage, 50, 40, 300+(Math.random()*200), HEAL, 40, 15*this.speed)
                :
                gameObjects[20 + this.counter] = new Obstacle(lifeImage, 50, 40, 600, HEAL, 40, 15*this.speed)
                break;
            case 2:
                fly ?
                gameObjects[20 + this.counter] = new Obstacle(ballImage, 30, 30, 300, POINTS, 40, 15*this.speed)
                :
                gameObjects[20 + this.counter] = new Obstacle(ballImage, 30, 30, 600, POINTS, 40, 15*this.speed)
                break;
            case 3:
                let randNumb = Math.random();
                switch(true){
                    case randNumb < 0.4:
                        // cactus - ground - dmg
                        gameObjects[20 + this.counter] = new Obstacle(obstacleImage1, 30, 60, 600, DMG, 20, 15*this.speed);
                        break;
                    case randNumb < 0.6:
                        // rocket - air - dmg
                        gameObjects[20 + this.counter] = new Obstacle(rocketImage, 80, 30, 600-270, DMG, 20, 11*this.speed);
                        break;
                    case randNumb < 1:
                        // log - ground - dmg
                        gameObjects[20 + this.counter] = new Obstacle(logsImage, 50, 40, 600, DMG, 20, 15*this.speed);
                        break
                };
                break;
            default:
                break;
        }
        Array.isArray(this.objects) && this.objects.push(20 + this.counter);
        gameObjects[20 + this.counter].start();
        this.counter ++;
    }

    getConfig(){
        let config = {
            breakpoints:[{
                breakpoint: 0,
                speed: 0.7,
                obstacleInterval: 15
            },{
                breakpoint: 50,
                speed: 0.5,
                obstacleInterval: 12
            },{
                breakpoint: 100,
                speed: 0.4,
                obstacleInterval: 10
            },{
                breakpoint: 150,
                speed: 0.4,
                obstacleInterval: 7
            },{
                breakpoint: 200,
                speed: 0.3,
                obstacleInterval: 6
            },{
                breakpoint: 250,
                speed: 0.2,
                obstacleInterval: 5
            }
        ]
        };
        
        let currentConfig = config.breakpoints.reduce(function (accumulatedValue, currentValue) {
            if(accumulatedValue.breakpoint < currentValue.breakpoint && currentValue.breakpoint < gameObjects[score].getPoints()){
                return currentValue;
            }
            return accumulatedValue;

        })
        return currentConfig;
    }

    updateConfig(){
        let config = this.getConfig();
        if(config.breakpoint != this.lastBreakpointReached){
            console.log("Breakpoint reached!")
            console.log(config);
            this.lastBreakpointReached = config.breakpoint;
            this.speed = config.speed;
            this.obstacleInterval = config.obstacleInterval;

            //  update main game objects
            {
                // gameObjects[background1].stop();
                // gameObjects[background1].setSpeed(0.7);
                // gameObjects[background1].start();

                // gameObjects[floor].stop();
                // gameObjects[floor].setSpeed(0.7);
                // gameObjects[floor].start();
            }
            gameObjects[runner].setSpeed(this.speed);
        }
    }
}