class RunnerAnimation extends GameObject
{
    /* Each gameObject MUST have a constructor() and a render() method.        */
    /* If the object animates, then it must also have an updateState() method. */

    constructor(runnerImage, centreX, centreY, size, runnerAnimationSpeed, jumpSpeed = 40, delay = 0)
    {
        super(runnerAnimationSpeed, delay); /* as this class extends from GameObject, you must always call super() */

        this.runnerImage = runnerImage;
        this.centreX = centreX;
        this.centreY = centreY;
        this.size = size;
        this.delay = delay;
        this.NUMBER_OF_SPRITES = 6;
        this.NUMBER_OF_COLUMNS_IN_SPRITE_IMAGE = 8;
        this.NUMBER_OF_ROWS_IN_SPRITE_IMAGE = 1;
        this.START_ROW = 0;
        this.START_COLUMN = 0;

        //  JUMPING PARAMETERS
        this.positionY = centreY;
        this.jumping = 0;
        this.falling = false;
        this.oldHeightHolder = 0;
        this.jumpHeight = 140;
        this.jumpSpeed = jumpSpeed;


        this.currentgameObject = 0;
        this.row = this.START_ROW;
        this.column = this.START_COLUMN;

        this.SPRITE_WIDTH = (this.runnerImage.width / this.NUMBER_OF_COLUMNS_IN_SPRITE_IMAGE);
        this.SPRITE_HEIGHT = (this.runnerImage.height / this.NUMBER_OF_ROWS_IN_SPRITE_IMAGE);
    }

    updateState()
    {
        // run animation
        {
        if (this.currentgameObject === this.NUMBER_OF_SPRITES)
        {
            this.currentgameObject = 0;
            this.column = 0;
            this.row = 0;
        }
        this.currentgameObject++;

        this.column++;
        if (this.column >= this.NUMBER_OF_COLUMNS_IN_SPRITE_IMAGE)
        {
            this.column = 0;
            this.row++;
        }
        }

        // jump logic
        if(this.jumping != 0){
            //  FIRST JUMP
            if(this.jumping == 1){

                // GO UP
                if(!this.falling){
                    if(this.positionY > this.centreY - this.jumpHeight){
                        this.positionY -= this.jumpSpeed;
                    }else {
                        this.falling = true;
                    }
                }
                // GO DOWN
                else if(this.falling){
                    if(this.positionY < this.centreY){
                        this.positionY += this.jumpSpeed;
                    }else {
                        this.falling = false;
                        this.jumping = 0;
                    }
                }
            }

            // SECOND JUMP
            else if(this.jumping == 2){
                // GO UPPER
                if(!this.falling){               
                    if(this.oldHeightHolder == 0){
                        this.oldHeightHolder = this.centreY - this.positionY;
                    }
                    if(this.positionY > this.centreY - this.jumpHeight - this.oldHeightHolder){
                        this.positionY -= this.jumpSpeed;
                    }else {
                        this.falling = true;
                    }
                }
                // GO DOWN
                if(this.falling){
                    if(this.positionY < this.centreY){
                        this.positionY += this.jumpSpeed;
                    }else {
                        this.falling = false;
                        this.jumping = 0;
                        this.oldHeightHolder = 0;
                    }
                }
            }
        }
    }

    render()
    {
        ctx.drawImage(
            this.runnerImage,
            this.column * this.SPRITE_WIDTH,
            this.row * this.SPRITE_WIDTH,
            this.SPRITE_WIDTH,
            this.SPRITE_HEIGHT,
            this.centreX - parseInt(this.size / 2),
            this.positionY - parseInt(this.size / 2),
            this.size,
            this.size
        );
    }

    jump(){
        if(this.jumping != 2){
            this.jumping += 1;
            if(this.jumping == 2) this.falling = false;
            console.log("jumping: " + this.jumping)
        } else{
            console.log("You cannot jump more than twice!")
        }
    }

    getPosition(){
        //left top
        //right top
        //right bottom
        //left bottom
        return [{
                'x': this.centreX - parseInt(this.size / 2),
                'y': this.positionY - parseInt(this.size / 2)
            },{
                'x': this.centreX + parseInt(this.size / 2),
                'y': this.positionY - parseInt(this.size / 2)
            },{
                'x': this.centreX + parseInt(this.size / 2),
                'y': this.positionY + parseInt(this.size / 2)
            },{
                'x': this.centreX - parseInt(this.size / 2),
                'y': this.positionY + parseInt(this.size / 2)
            }
        ]
    }
    touch(x, y){
        if(
            x < this.centreX + parseInt(this.size / 3) &&
            x > this.centreX - parseInt(this.size / 5) &&
            y < this.positionY + parseInt(this.size / 2) &&
            y > this.positionY - parseInt(this.size / 2)
        ){ return true; }
        return false;
    }
    setSpeed(value){
        this.stop();
        this.updateStateMilliseconds = 400 * value;
        this.jumpSpeed = 15 + (1 - value)*40;
        this.start();
    }
}