import React, {Component} from 'react'
import {Line, Rect, Circle} from './constructors'
import './canvasdraw.css'

class CanvasDraw extends Component {
    constructor() {
        super()
        this.state =  {
        isPainting: false,
        tool: '',
        color: '',
        userStrokeStyle: '#F0C987',
        duplicateLastObj: {},
        newObj: {},
        shape: false,
        shape: 'line',
        colorArray: [
              '#046975',
              '#2EA1D4',
              '#3BCC2A',
              '#FFDF59',
              '#FF1D47'
            ]
        }
    }
    newObj = {}
    drawObj = []

    updateShapeCircle = (e) => {
        this.setState({
            shape: 'circle'
        })
    }
    updateShapeLine = (e) => {
        this.setState({
            shape: 'line'
        })
    }
    updateShapeRect = (e) => {
        this.setState({
            shape: 'rect'
        })
    }

    updateToolPan  = (e) => {
        this.setState({
            tool: 'pan',
            shape: false
        })
    }


    updateTool= (e) => {
        this.setState({
            tool: e.target.name
        })
    }

    updateColor = (e) => {
        this.setState({
            color: e.target.name
        })
    }


    componentDidMount = () => {
        this.canvas.width = 900
        this.canvas.height = 700
        this.c = this.canvas.getContext('2d')
        this.c.lineJoin = 'round'
        this.c.lineCap = 'round'
        this.c.lineWidth = 2
    }

    onMouseDown = ({nativeEvent}) => {
        const {offsetX: x, offsetY : y} = nativeEvent
        if (this.state.shape === 'line') {
            const newLine = new Line(x,y,x,y)
            this.newObj = newLine
        } else if (this.state.shape ==='rect') {
            const newRect = new Rect(x,y,x,y)
            this.newObj = newRect
    
        } else if (this.state.shape === 'circle') {
            const newCircle = new Circle(x,y,30)
            this.newObj = newCircle
            this.newObj.draw(this.c)
        }        this.setState({
            isPainting: true
        })
    }

    onMouseMove = ({nativeEvent}) => {
        if (this.state.isPainting === true){
            const {offsetX, offsetY} = nativeEvent
            if (this.state.shape === 'line' || this.state.shape === 'rect') {
                this.newObj.update(offsetX,offsetY)
            } else if (this.state.shape === 'circle') {
                // const {x,y} = this.newObj
                // const radius = (Math.sqrt((x - offsetX) ** 2 + (y - offsetY) ** 2))
                let radius = 30
                this.newObj.update(offsetX, offsetY,radius)
            }
            this.c.clearRect(0,0,1000,1000)
            this.newObj.draw(this.c)
            if (this.drawObj) {
                for (let i = 0; i < this.drawObj.length; i++) {
                    this.drawObj[i].draw(this.c)
                }
            }
        }
    }
    

    onMouseUp = ({nativeEvent}) => {
        const {offsetX, offsetY} = nativeEvent
        if (this.state.shape === 'line' || this.state.shape === 'rect') {
            this.newObj.update(offsetX,offsetY)
        } else if (this.state.shape === 'circle') {
            const {x,y} = this.state.newObj
            const radius = (Math.sqrt((x - offsetX) ** 2 + (y - offsetY) ** 2))
            this.newObj.update(offsetX,offsetY, 30)
        }
        this.drawObj.push(this.newObj)
        this.c.clearRect(0,0,1000,1000)
        this.newObj.draw(this.c)
        for (let i = 0; i < this.drawObj.length; i++) {
            this.drawObj[i].draw(this.c)

        }
        
        this.setState({
            isPainting: false
        })
    }

    render() {
        return(
           <div className="pageContainer">
               <div className="viewport">
                   <canvas 
                       ref={(ref) => (this.canvas = ref)}
                       style={{ background: 'white' }}
                       onMouseDown={this.onMouseDown}
                    //    onMouseLeave={this.endPaintEvent}
                       onMouseUp={this.onMouseUp}
                       onMouseMove={this.onMouseMove}
                    />
               </div>
               <div className="toolbox">
                    <div className="shapePicker">
                      <h2 name="circle" onClick={this.updateShapeCircle}>Circle</h2>
                       <h2 name="line" onClick={this.updateShapeLine}>Line</h2>
                       <h2 name="rect" onClick={this.updateShapeRect}>Rectangle</h2>
                   </div>
                   <div className="tool">
                       <h2 name="marker" onClick={this.updateTool}>Marker</h2>
                       <h2 name="pan" onClick={this.updateToolPan}>Pan</h2>
                       <h2 name="delete" onClick={this.updateTool}>Delete</h2>
                   </div>
               </div>
           </div>
        )
    }
} export default CanvasDraw