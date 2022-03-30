const canvas = document.querySelector('canvas')
const c = canvas.getContext('2d')

canvas.width = window.innerWidth
canvas.height = window.innerHeight

/* c.fillRect(100, 100, 100, 100)
c.fillRect(200, 200, 100, 100)
c.fillRect(300, 300, 100, 100)
c.fillRect(400, 400, 100, 100)
 */
//Line
/* c.beginPath()
c.moveTo(50, 300) */
/* c.lineTo(300, 100) */
/* c.lineTo(10, 10)
c.lineTo(500, 120)
c.lineTo(50, 300)
c.stroke() */

// Arc / Circle

/* c.beginPath() */
//Parametros -> c.arc(x:Int, y:Int, raio:Int, startAngle: Float(Radianos), endAngle: Float(Radianos), drawCounterClockWise: Bool (false))
/* c.arc(500, 300, 50, 0, Math.PI * 2, true)
c.stroke() */

/* for (i = 0; i < 200; i++){
  let x = Math.random() * window.innerWidth
  let y = Math.random() * window.innerHeight

  let red = Math.random() * 255
  let green = Math.random() * 255
  let blue = Math.random() * 255

  c.beginPath()
  c.arc(x, y, 50, 0, Math.PI * 2, false)
  c.strokeStyle = `rgba(${red},${green},${blue}, 1)`
  c.stroke()
}
 */



/* function Circle (x, y, dx, dy, radius) {
 this.x = x
 this.y = y
 this.dx = dx
 this.dy = dy
 this.radius = radius

 this.draw = function (){
  c.beginPath()
  c.arc(this.x, this.y, this.radius, 0, Math.PI * 2, false)
  c.strokeStyle = 'blue'
  c.stroke()
 }

 this.update = function (){

  if(this.x + this.radius > innerWidth || this.x - this.radius < 0){
    this.dx = -this.dx
  }

  if(this.y + this.radius > innerHeight || this.y - this.radius < 0){
    this.dy = -this.dy
  }

  this.x += this.dx
  this.y += this.dy
  
  this.draw();
 }
} */
let mouse = {
  x: undefined,
  y: undefined,
}

let maxRadius = 40
/* et minRadius = 2 */

let colorArray = [
  '#EBEBEB',
  '#FFFFFF',
  '#878787',
  '#DEDEDE',
  '#EBEBEB',
]

window.addEventListener('mousemove', 
  function(event){
    mouse.x = event.x
    mouse.y = event.y
  })

window.addEventListener('resize', function (){
  canvas.width = window.innerWidth
  canvas.height = window.innerHeight
})

class Circle {
  constructor(x, y, dx, dy, radius, opacity, red, blue, green) {
    this.x = x
    this.y = y
    this.dx = dx
    this.dy = dy
    this.radius = radius
    this.minRadius = radius
    this.opacity = opacity
    this.color = colorArray[Math.floor(Math.random() * colorArray.length - 1)]
  }

  draw (){
    c.beginPath()
    c.arc(this.x, this.y, this.radius, 0, Math.PI * 2, false)
    c.fillStyle = this.color
    c.fill()
   
  }

  update(){
    
    if(this.x + this.radius > innerWidth || this.x - this.radius < 0){
        this.dx = -this.dx
      }

      if(this.y + this.radius > innerHeight || this.y - this.radius < 0){
        this.dy = -this.dy
      }

      this.x += this.dx
      this.y += this.dy
      
      // interactivy

      if (mouse.x - this.x < 50 && mouse.x - this.x > -50 && mouse.y - this.y < 50 && mouse.y - this.y > -50){
        if (this.radius < maxRadius){
          this.radius += 1
        }
      } else if (this.radius > this.minRadius){
        this.radius -= 1
        
      }

      this.draw();
      
  }  
}

let circleArray = []

for (var i = 0; i < 1000; i++){
  let opacity = Math.random()
  let radius = Math.random() * 3 + 1
  let x = Math.random() * (innerWidth - radius * 2) + radius
  let y = Math.random() * (innerHeight - radius * 2) + radius
  let dx = (Math.random() - 0.5) 
  let dy = (Math.random() - 0.5)
  

  circleArray.push(new Circle(x, y, dx, dy, radius, opacity))
}


function animate(){
  c.clearRect(0, 0, innerWidth, innerHeight)
  requestAnimationFrame(animate)
  
  for (var i = 0; i < circleArray.length; i++){
    circleArray[i].update()
  }


}
animate()

