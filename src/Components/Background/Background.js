import React, {useEffect, useRef} from 'react'
import './Background.css'

function Background(props){
    const canvasRef = useRef(null)
    
    useEffect(() => {
        const canvas = canvasRef.current
        const ctx = canvas.getContext('2d')
        canvas.width = window.innerWidth
        canvas.height = window.innerHeight
        if (!props.modal && !props.regModal || !props.visited) {
            // text(ctx)
            drawBackground()
            setInterval(() => drawBackground(), 7000)
            
        }
    },[])


    function text (ctx) {
        // var my_gradient=ctx.createLinearGradient(0, 0, 1800, 0);
        // my_gradient.addColorStop(.001, "#FF9B42");
        // my_gradient.addColorStop(0.2,'#13c8d8' );
        // my_gradient.addColorStop(.5, "#08545b")
        // my_gradient.addColorStop(0.8, '#13c8d8');
        // my_gradient.addColorStop(.99, "#FF9B42");
        // ctx.fillStyle = my_gradient
        // ctx.fillRect(0,0,10000,10000)
        ctx.font = '300px sans-serif'
        ctx.fillStyle = '#0fa3b1'
        ctx.strokeStyle = '#BC8443'
        ctx.lineWidth=8
        ctx.strokeText('ALL THINK',60, 400)
        ctx.fillText('ALL THINK',60, 400)
    }
    const colorArray = [
        '#0fa3b1', '#13c8d8', '#08545','#08545b', '#4F2E08', '#7C490D', '#BC8443', '#BC8443','#FF9B42'
      ]
    


   const line = function(x,y,offsetX, offsetY) {
        this.x = x
        this.y = y
        this.offsetX = offsetX
        this.offsetY = offsetY        
        this.color = colorArray[Math.floor(Math.random() * colorArray.length)]
        this.draw = function(ctx) {
            ctx.beginPath();
            ctx.lineJoin = 'round'
            ctx.lineCap = 'round'
            ctx.lineWidth = 10
            ctx.strokeStyle = this.color
            ctx.moveTo(this.x,this.y)
            ctx.lineTo(this.offsetX, this.offsetY)
            ctx.stroke()
        }
        this.update = function(x,y) {
            this.offsetX = x
            this.offsetY = y        
        }
    }
    
    const rect = function(x,y,offsetX,offsetY) {
        this.x = x
        this.y = y
        this.width = Math.random() * (200) 
        this.height = Math.random() * (200) 
        this.color = colorArray[Math.floor(Math.random() * colorArray.length)]
        this.draw = function(ctx) {
            ctx.beginPath()
            ctx.fillStyle = this.color
            ctx.fillRect(this.x,this.y,this.width,this.height)
        }
        this.update = function (x,y) {
            this.width = x- this.x 
            this.height = y -  this.y 
        }
    }
    
    const circle = function(x,y,radius) {
        this.x = x
        this.y = y
        this.radius = radius
        this.color = colorArray[Math.floor(Math.random() * colorArray.length)]
        // this.permColor = color
        this.draw = function(ctx) {
            ctx.beginPath()
            ctx.arc(this.x, this.y, this.radius, 0, Math.PI * 2, false)
            ctx.strokeStyle = 'black'
            ctx.fillStyle = this.color
            ctx.stroke()
            ctx.fill()
          }
        this.update = function(radius) {
            this.radius = radius
          }
        }
    
    function drawBackground() {
        const canvas = canvasRef.current
        const ctx = canvas.getContext('2d')
        canvas.width = window.innerWidth
        canvas.height = window.innerHeight
        let drawObj = []
        console.log('hitting drawbackground function')
        if (drawObj.length < 1) {
            for (let i = 0; i < 10; i++){
                const x = Math.random() * (canvas.width) 
                const offsetX = Math.random() * (canvas.width) 
                const y = Math.random() * (canvas.height) 
                const offsetY = Math.random() * (canvas.height) 
                const test = new rect(x,y,offsetX,offsetY)
                drawObj.push(test)
            }
            
                
            for (let i = 0; i < 10; i++){
                const radius = 30
                const x = Math.random() * (canvas.width-radius * 2) + radius
                const y = Math.random() * (canvas.height - radius * 2) + radius
                const test = new circle(x,y,radius)
                drawObj.push(test)
            }
            
            for (let i = 0; i < 10; i++){
                const x = Math.random() * (canvas.width) 
                const offsetX = Math.random() * (canvas.width) 
                const y = Math.random() * (canvas.height) 
                const offsetY = Math.random() * (canvas.height) 
                const test = new line(x,y,offsetX,offsetY)
                drawObj.push(test)
            }
        }
        for (let i = 0; i < drawObj.length; i++) {
            drawObj[i].draw(ctx)
        }
        ctx.font = '325px sans-serif'
        ctx.fillStyle = '#0fa3b1'
        ctx.strokeStyle = 'black'
        ctx.lineWidth=8
        ctx.strokeText('ALL THINK',60, 400)
        ctx.fillText('ALL THINK',60, 400)
        props.hasVisited()
    }


    return(
        <canvas
            onClick={() => drawBackground()}
            className='background-stuff-bro'
            style={{width: '100vw'}}
            ref={canvasRef}
        >

        </canvas>
    )
}

export default Background