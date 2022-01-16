class TopScore extends GameObject
{
    /* Each gameObject MUST have a constructor() and a render() method.        */
    /* If the object animates, then it must also have an updateState() method. */

    constructor()
    {
        super(200, 2);

        /* These variables depend on the object */
        this.points = '---';
        //REQUEST
    }
    render()
    {
        ctx.font = "20px Arial";
        ctx.fillStyle = 'black';
        ctx.fillText(`Highest score: ${this.points}`, 220, 60);
    }
    getPoints(){
        return this.points;
    }
    extraPoints( value ){
        this.points += value;
    }
}