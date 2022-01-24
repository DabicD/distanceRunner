class Obstacle extends GameObject
{
    /* Each gameObject MUST have a constructor() and a render() method.        */
    /* If the object animates, then it must also have an updateState() method. */

    constructor(obstacleImage, width, height, bottom, effect, effectValue, speed = 5, delay = 0)
    {
        super(speed, delay);

        /* These variables depend on the object */
        this.obstacleImage = obstacleImage;
        this.width = width;
        this.height = height;
        this.positionX = 510;
        this.speed = speed;
        this.positionY = bottom - this.height - 80;
        this.touched = false;
        this.effect = effect;
        this.effectValue = effectValue;
        this.outOfScreen = false;

    }
    updateState()
    {
        this.positionX -= 1.5;
        if(this.outOfScreen == false && (this.positionX + this.width) <= 0){
            this.outOfScreen = true;
        }
    }
    render()
    {
        ctx.drawImage(
            this.obstacleImage,
            this.positionX,
            this.positionY,
            this.width,
            this.height
            );
    }

    getPosition(){
        return [{
                x: this.positionX,
                y: this.positionY
            },{
                x: this.positionX + this.width,
                y: this.positionY
            },{
                x: this.positionX + this.width,
                y: this.positionY + this.height
            },{
                x: this.positionX,
                y: this.positionY + this.height
            }
        ]
    }

    getTouched(){
        return this.touched;
    };
    setTouched(x){
        this.touched = x;
    };
    getEffect(){
        return this.effect;
    }
    getEffectValue(){
        return this.effectValue;
    }

    isOutOfScreen(){
        return this.outOfScreen;
    }
}