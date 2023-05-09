const canvas = document.getElementById('canvas1');
const ctx = canvas.getContext('2d');
canvas.width = window.innerWidth;
canvas.height = window.innerHeight;
let particleArray = [];
let adjustX = 20;
let adjustY = 20;

// handle mouse

const mouse = {
    x: null,
    y: null,
    radius: 250
}

window.addEventListener('mousemove', function(event){
mouse.x = event.x;
mouse.y = event.y;
})

ctx.fillStyle = 'red'
ctx.font = '20px Verdana';
ctx.fillText('AANVI', 20, 20);
const textCordinates = ctx.getImageData(0,0,200,200);
// ctx.strokeStyle = 'white';
// ctx.strokeRect(0,0,100,100)  ........> to see the area which we are targeting

class Particle{
    constructor(x, y){
        this.x = x;
        this.y = y;
        this.size = 2;
        this.baseX = this.x;
        this.baseY = this.y;
        this.density = (Math.random()*150) + 50;
    }

    draw(){
        ctx.fillStyle = 'pink';
        ctx.beginPath();
        ctx.arc(this.x, this.y,this.size, 0, Math.PI*(1/2));
        ctx.closePath();
        ctx.fill();
    }

    update(){
        let dx = mouse.x - this.x;
        let dy = mouse.y - this.y;
        let distance = Math.sqrt(dx*dx + dy*dy);
        let forceDistaneX = dx/distance;
        let forceDistaneY = dy/distance;
        let maxDistance = mouse.radius;
        let force = (maxDistance - distance)/maxDistance;
        let dirextionX = forceDistaneX*force*this.density;
        let dirextionY = forceDistaneY*force*this.density;

        if(distance < mouse.radius){
            this.x -=dirextionX;
            this.y -=dirextionY;
            this.size = 10;
        }
        else{
       if(this.x !== this.baseX){
        let dx = this.x - this.baseX;
        this.x -= dx/5;
       }
       if(this.y !== this.baseY){
        let dy = this.y - this.baseY;
        this.y -= dy/5;
       }
        }
    }

}

function init(){
        particleArray=[];
    for(let y=0, y2 = textCordinates.height; y < y2; y++){
        for (let x = 0, x2 = textCordinates.width; x < x2; x++){
            if(textCordinates.data[(y*4*textCordinates.width) + (x*4) + 3] > 128){
                let positionX = x + adjustX;
                let positionY = y + adjustY;
                particleArray.push(new Particle(positionX*10, positionY*10));
            }
        }
    }

}

init()
console.log(particleArray)

function animate(){
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    for (let i =0; i < particleArray.length; i++){
        particleArray[i].draw();
        particleArray[i].update();
    }
    connect()
    requestAnimationFrame(animate);
}

animate()

function connect(){
    let opacityValue= 1;
    for(let a=0; a< particleArray.length; a++){
        for(let b=a; b< particleArray.length; b++){
            let dx  = particleArray[a].x -particleArray[b].x
            let dy = particleArray[a].y - particleArray[b].y
            let distance = Math.sqrt(dx*dx + dy*dy)

            if(distance<50){
                opacityValue=1 -(distance/5);
                    ctx.strokeStyle = 'rgba(255,255,255,' + opacityValue + ')';
                    ctx.lineWidth = 2;
                    ctx.beginPath();
                    ctx.moveTo(particleArray[a].x, particleArray[a].y)
                    ctx.lineTo(particleArray[b].x, particleArray[b].y)
                    ctx.stroke()
            }
        }
    }
}
