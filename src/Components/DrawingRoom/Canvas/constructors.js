export const Line = function(x,y,offsetX, offsetY,tools) {
    this.shape = 'line'
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
    this.shape = 'rect'
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
        c.strokeStyle = 'pink'
        c.strokeRect(this.x,this.y,this.width,this.height)
        c.fillRect(this.x,this.y,this.width,this.height)
    }
    this.update = function (x,y) {
        this.width = x- this.x 
        this.height = y -  this.y 
    }
}

export const Circle = function(x,y,radius,tools) {
    this.shape = 'circle'
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
        c.strokeStyle = 'pink'
        c.fillStyle = 'white'
        c.stroke()
        c.fill()
      }
    this.update = function(x,y) {
        this.x = x
        this.y = y
      }
    }


export const FreeDraw = function(x,y,tools) {
    this.shape = 'freeDraw'
    this.x = x
    this.y = y
    this.offsetX = x
    this.offsetY = y
    this.pointsArray = []
    this.fillStyle =  tools.fillStyle
    this.strokeStyle = tools.strokeStyle
    this.lineWidth = tools.lineWidth
    // this.color = colorArray[Math.floor(Math.random() * colorArray.length)]
    this.draw = (c) => {
        let line = {x:this.x, y:this.y, offsetX:this.offsetX,offsetY:this.offsetY}
        this.pointsArray.push(line)
        c.beginPath();
        c.lineJoin = 'round'
        c.lineCap = 'round'
        c.lineWidth = this.lineWidth
        c.strokeStyle = this.strokeStyle
        for (let i = 0; i < this.pointsArray.length; i++) {
            c.moveTo(this.pointsArray[i].x,this.pointsArray[i].y)
            c.lineTo(this.pointsArray[i].offsetX, this.pointsArray[i].offsetY)
        }
        this.x = this.offsetX
        this.y = this.offset
        c.stroke()
    }

    this.drawSelected = (c) => {
        c.beginPath()
            c.strokeStyle = 'pink'
            c.lineJoin = 'round'
            c.lineCap = 'round'
            c.lineWidth = this.lineWidth
        for (let i = 0; i < this.pointsArray.length; i++){
            c.moveTo(this.pointsArray[i].x,this.pointsArray[i].y)
            c.lineTo(this.pointsArray[i].offsetX, this.pointsArray[i].offsetY)
        }        
        c.stroke()
    }
    this.update = function(x,y) {
        this.offsetX = x
        this.offsetY = y        
    }
}

export const LineComplete = function(newObj) {
    this.shape = 'line'
    this.x = newObj.x
    this.y = newObj.y
    this.offsetX = newObj.offsetX
    this.offsetY = newObj.offsetY        
    this.fillStyle =  newObj.fillStyle
    this.strokeStyle = newObj.strokeStyle
    this.lineWidth = newObj.lineWidth
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

export const RectComplete = function(newObj) {
    this.shape = 'rect'
    this.x = newObj.x
    this.y = newObj.y
    this.width = newObj.width
    this.height = newObj.height
    
    this.fillStyle =  newObj.fillStyle
    this.strokeStyle = newObj.strokeStyle
    this.lineWidth = newObj.lineWidth
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
        c.strokeStyle = 'pink'
        c.strokeRect(this.x,this.y,this.width,this.height)
        c.fillRect(this.x,this.y,this.width,this.height)
    }
    this.update = function (x,y) {
        this.width = x- this.x 
        this.height = y -  this.y 
    }
}

export const CircleComplete = function(newObj) {
    this.shape = 'circle'
    this.x = newObj.x
    this.y = newObj.y
    this.radius = newObj.radius
    this.strokeStyle = newObj.strokeStyle
    this.fillStyle = newObj.fillStyle
    this.lineWidth = newObj.lineWidth
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


export const FreeDrawComplete = function(newObj) {
    this.shape = 'freeDraw'
    this.pointsArray = newObj.pointsArray
    this.fillStyle =  newObj.fillStyle
    this.strokeStyle = newObj.strokeStyle
    this.lineWidth = newObj.lineWidth
    // this.color = colorArray[Math.floor(Math.random() * colorArray.length)]
    this.draw = (c) => {
        let line = {x:this.x, y:this.y, offsetX:this.offsetX,offsetY:this.offsetY}
        this.pointsArray.push(line)
        c.beginPath();
        c.lineJoin = 'round'
        c.lineCap = 'round'
        c.lineWidth = this.lineWidth
        c.strokeStyle = this.strokeStyle
        for (let i = 0; i < this.pointsArray.length; i++) {
            c.moveTo(this.pointsArray[i].x,this.pointsArray[i].y)
            c.lineTo(this.pointsArray[i].offsetX, this.pointsArray[i].offsetY)
        }
        this.x = this.offsetX
        this.y = this.offset
        c.stroke()
    }

    this.drawSelected = (c) => {
        c.beginPath()
            c.strokeStyle = 'pink'
            c.lineJoin = 'round'
            c.lineCap = 'round'
            c.lineWidth = this.lineWidth
        for (let i = 0; i < this.pointsArray.length; i++){
            c.moveTo(this.pointsArray[i].x,this.pointsArray[i].y)
            c.lineTo(this.pointsArray[i].offsetX, this.pointsArray[i].offsetY)
        }        
        c.stroke()
    }

    this.update = function(x,y) {
        this.offsetX = x
        this.offsetY = y        
    }
}