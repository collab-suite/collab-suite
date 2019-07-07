export const Line = function(x,y,offsetX, offsetY,tools) {
    this.x = x
    this.y = y
    this.offsetX = offsetX
    this.offsetY = offsetY        
    this.fillStyle =  tools.fillStyle
    this.strokeStyle = tools.strokeStyle
    this.lineWidth = tools.lineWidth
    // this.color = colorArray[Math.floor(Math.random() * colorArray.length)]
    this.draw = (c) => {
        c.beginPath();
        c.lineJoin = 'round'
        c.lineCap = 'round'
        c.lineWidth = this.lineWidth
        c.strokeStyle = this.strokeStyle
        c.moveTo(this.x,this.y)
        c.lineTo(this.offsetX, this.offsetY)
        c.stroke()
    }

    this.drawSelected = (c) => {
        c.beginPath();
        c.lineJoin = 'round'
        c.lineCap = 'round'
        c.lineWidth = this.lineWidth
        c.strokeStyle = 'pink'
        c.moveTo(this.x,this.y)
        c.lineTo(this.offsetX, this.offsetY)
        c.stroke()
    }
    this.update = function(x,y) {
        this.offsetX = x
        this.offsetY = y        
    }
}

export const Rect = function(x,y,tools) {
    this.x = x
    this.y = y
    this.width = 0
    this.height = 0
    
    this.fillStyle =  tools.fillStyle
    this.strokeStyle = tools.strokeStyle
    this.lineWidth = tools.lineWidth
    // this.color = colorArray[Math.floor(Math.random() * colorArray.length)]
    this.draw = (c) => {
        c.beginPath()
        c.lineWidth = this.lineWidth
        c.fillStyle = this.fillStyle
        c.strokeStyle = this.strokeStyle
        c.strokeRect(this.x,this.y,this.width,this.height)
        c.fillRect(this.x,this.y,this.width,this.height)
    }
    this.drawSelected = (c) => {
        c.beginPath()
        c.lineWidth = this.lineWidth
        c.fillStyle = 'white'
        c.strokeStyle = 'black'
        c.strokeRect(this.x,this.y,this.width,this.height)
        c.fillRect(this.x,this.y,this.width,this.height)
    }
    this.update = function (x,y) {
        this.width = x- this.x 
        this.height = y -  this.y 
    }
}

export const Circle = function(x,y,radius,tools) {
    this.x = x
    this.y = y
    this.radius = radius
    this.strokeStyle = tools.strokeStyle
    this.fillStyle = tools.fillStyle
    this.lineWidth = tools.lineWidth
    // this.permColor = color
    this.draw = (c) => {
        c.beginPath()
        c.lineWidth = this.lineWidth
        c.arc(this.x, this.y, this.radius, 0, Math.PI * 2, false)
        c.strokeStyle = this.strokeStyle
        c.fillStyle = this.fillStyle
        c.stroke()
        c.fill()
      }
    this.drawSelected = (c) => {
        c.beginPath()
        c.lineWidth = this.lineWidth
        c.arc(this.x, this.y, this.radius, 0, Math.PI * 2, false)
        c.strokeStyle = 'black'
        c.fillStyle = 'white'
        c.stroke()
        c.fill()
      }
    this.update = function(x,y) {
        this.x = x
        this.y = y
      }
    }
