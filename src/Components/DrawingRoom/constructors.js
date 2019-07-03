export const Line = function(x,y,offsetX, offsetY) {
    this.x = x
    this.y = y
    this.offsetX = offsetX
    this.offsetY = offsetY        
    // this.color = colorArray[Math.floor(Math.random() * colorArray.length)]
    this.draw = (c) => {
        c.beginPath();
        c.lineJoin = 'round'
        c.lineCap = 'round'
        c.lineWidth = 10
        c.strokeStyle = 'blue'
        c.moveTo(this.x,this.y)
        c.lineTo(this.offsetX, this.offsetY)
        c.stroke()
    }
    this.update = function(x,y) {
        this.offsetX = x
        this.offsetY = y        
    }
}

export const Rect = function(x,y,offsetX,offsetY) {
    this.x = x
    this.y = y
    this.width = 0
    this.height = 0
    // this.color = colorArray[Math.floor(Math.random() * colorArray.length)]
    this.draw = (c) => {
        c.beginPath()
        c.fillStyle = 'blue'
        c.fillRect(this.x,this.y,this.width,this.height)
    }
    this.update = function (x,y) {
        this.width = x- this.x 
        this.height = y -  this.y 
    }
}

export const Circle = function(x,y,radius) {
    this.x = x
    this.y = y
    this.radius = radius
    this.color = 'black'
    // this.permColor = color
    this.draw = (c) => {
        c.beginPath()
        c.arc(this.x, this.y, this.radius, 0, Math.PI * 2, false)
        c.strokeStyle = 'blue'
        c.fillStyle = 'blue'
        c.stroke()
        c.fill()
      }
    this.update = function(x,y,radius) {
        this.radius = radius
        this.x = x
        this.y = y
      }
    }
