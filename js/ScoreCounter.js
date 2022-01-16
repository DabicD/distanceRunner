class ScoreCounter extends GameObject
{
    /* Each gameObject MUST have a constructor() and a render() method.        */
    /* If the object animates, then it must also have an updateState() method. */

    constructor()
    {
        super(200, 2);

        /* These variables depend on the object */
        this.points = 0;
        this.counting = true;
    }
    updateState()
    {
        this.counting && (this.points += 1);
    }
    render()
    {
        ctx.font = "30px Arial";
        ctx.fillStyle = 'black';
        ctx.fillText(`Score: ${this.points}`, 10, 40);
    }
    getPoints(){
        return this.points;
    }
    extraPoints( value ){
        this.points += value;
    }
    stopCounting(){
        this.counting = false;
    }
    postPoints(){
        this.httpPost('http://localhost:5500/score');
    }
    httpPost(theUrl){
        var xmlHttp = new XMLHttpRequest();
        xmlHttp.open( "POST", theUrl, true );
        xmlHttp.send( this.points );
    }
}