class LifeCounter extends GameObject
{
    /* Each gameObject MUST have a constructor() and a render() method.        */
    /* If the object animates, then it must also have an updateState() method. */

    constructor(heartImage)
    {
        super(100);
        
        /* These variables depend on the object */
        this.points = 1;
        this.heartImage = heartImage;
    }

    render()
    {
        switch(this.points){
            case 3:
                ctx.drawImage(
                    this.heartImage,
                    110,
                    80,
                    40,
                    40
                );
            case 2:
                ctx.drawImage(
                    this.heartImage,
                    60,
                    80,
                    40,
                    40
                );
            case 1:
                ctx.drawImage(
                    this.heartImage,
                    10,
                    80,
                    40,
                    40
                );
        }
    }
    getLife(){
        return this.points;
    }
    addLife(){
        if(this.points != 3){
            this.points += 1;
        }
    }
    takeLife(){
        if(this.points > 0){
            this.points -= 1;
        }
    }
}