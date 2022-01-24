/* Author: Derek O Reilly, Dundalk Institute of Technology, Ireland. */

class ScrollingBackgroundImage extends GameObject
{
    /* Each gameObject MUST have a constructor() and a render() method.        */
    /* If the object animates, then it must also have an updateState() method. */

    constructor(image, updateStateMilliseconds)
    {
        super(updateStateMilliseconds); /* as this class extends from GameObject, you must always call super() */

        /* These variables depend on the object */
        this.image = image;

        this.x = 0;
    }

    updateState()
    {   
        this.x -= 1.5;
        if (this.x <= -canvas.width)
        {
            this.x = 0;
        }
    }

    render()
    {
        ctx.drawImage(this.image, this.x, 0, canvas.width, canvas.height);
        ctx.drawImage(this.image, this.x + canvas.width, 0, canvas.width, canvas.height);
    }
    setSpeed(value){
        this.updateStateMilliseconds = 15 * value;
        this.start();
    }

}