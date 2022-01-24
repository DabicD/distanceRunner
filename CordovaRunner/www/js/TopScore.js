class TopScore extends GameObject
{
    /* Each gameObject MUST have a constructor() and a render() method.        */
    /* If the object animates, then it must also have an updateState() method. */

    constructor()
    {
        super(200, 2);

        this.points = '---';
        this.isCalled = false;
    }
    updateState()
    {   
        if(!this.isCalled){
            this.getPoints();
            this.isCalled = true;
        }
    }
    render()
    {
        ctx.font = "20px Arial";
        ctx.fillStyle = 'black';
        ctx.fillText(`Highest score: ${this.points}`, 10, 70);
    }
    getPoints(){
        this.httpGet('http://localhost:5500/score');
    }
    httpGet(theUrl){
        var xmlHttp = new XMLHttpRequest();
        xmlHttp.onreadystatechange = function() {
            if (this.readyState == 4 && this.status == 200) {
                gameObjects[topScore].points = this.responseText;
            }
        };
        xmlHttp.open( "GET", theUrl, true ); // false for synchronous request
        xmlHttp.send( null );
        return xmlHttp.responseText;
    }
}