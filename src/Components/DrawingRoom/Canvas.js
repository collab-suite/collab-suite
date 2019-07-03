import React, {Component} from 'react'
import {Line, Rect, Circle} from './constructors'
import {connect} from 'react-redux'
import './canvasdraw.css'

class CanvasDraw extends Component {
    constructor() {
        super()
        this.state =  {
        isPainting: false,
        tools: {
            fillStyle:'white',
            strokeStyle:'black',
            lineWidth: 5,
            radius: 30,
        },
        userStrokeStyle: '#F0C987',
        duplicateLastObj: {},
        newObj: {},
        shape: 'line',
        shapeSize: false,
        fillStyle: false,
        strokeStyle: false,
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

    updateShape = (e) => {
        this.setState({
            shape: e.target.attributes.value.value
        })
        if (e.target.attributes.value.value === 'circle' || e.target.attributes.value.value === 'line') {
            this.setState({
                shapeSize: true,
                fillStyle: false,
                strokeStyle: false
            })
        }
    }

    updateShapeSize = (e) => {
        console.log(this.state.shape,this.state.tools)
        if (this.state.shape === 'circle') {
            if (e.target.attributes.value.value === 'small'){
                this.setState({
                    tools: {
                        radius: 10
                    }
                })
            } else if (e.target.attributes.value.value === 'medium') {
                this.setState({
                    tools: {
                        radius: 20
                    }
                })
            } else if (e.target.attributes.value.value === 'large') {
                this.setState({
                    tools: {
                        radius: 30
                    }
                })
            }
        } else if (this.state.shape ==='line') {
            console.log(e.target.attributes)
            if (e.target.attributes.value.value === 'small'){
                this.setState({
                    tools: {
                        lineWidth: 2
                    }
                })
            } else if (e.target.attributes.value.value === 'medium') {
                this.setState({
                    tools: {
                        lineWidth: 5
                    }
                })
            } else if (e.target.attributes.value.value === 'large') {
                this.setState({
                    tools: {
                        lineWidth: 10
                    }
                })
            }
        }
        this.setState({
            shapeSize: false
        })
    }

    updateColor = (e) => {
        this.setState({
            tools:{...this.state.tools,
                [e.target.attributes.name.value]:e.target.attributes.value.value
            }
        })
    }
    
    updateToolPan  = (e) => {
        this.setState({
            tool: 'pan',
            shape: false
        })
    }

    updateFillStyle = (e) => {
        this.setState({
            fillStyle: true,
            shapeSize: false,
            strokeStyle: false,
        })
    }
    updateStrokeStyle = (e) => {
        this.setState({
            strokeStyle: true,
            shapeSize: false,
            fillStyle: false
        })
    }

    componentDidMount = () => {
        this.canvas.width = 900
        this.canvas.height = 700
        this.c = this.canvas.getContext('2d')
        this.c.lineJoin = 'round'
        this.c.lineCap = 'round'
        this.c.lineWidth = 2
        this.props.socket.on('drawObj',(newObj) => {this.drawObj.push(newObj)})
    }

    onMouseDown = ({nativeEvent}) => {
        const {offsetX: x, offsetY : y} = nativeEvent
        if (this.state.shape === 'line') {
            const newLine = new Line(x,y,x,y, this.state.tools)
            this.newObj = newLine
        } else if (this.state.shape ==='rect') {
            const newRect = new Rect(x,y, this.state.tools)
            this.newObj = newRect
        } else if (this.state.shape === 'circle') {
            const newCircle = new Circle(x,y,this.state.tools.radius, this.state.tools)
            this.newObj = newCircle
            this.newObj.draw(this.c)
        } 
        this.setState({
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
                this.newObj.update(offsetX, offsetY)
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
        this.props.socket.emit('drawObj',this.newObj,this.props.roomID)
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
        console.log(this.state.tools)
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
               {this.state.shapeSize &&
                        <div className="attributes">
                            <h2 value='small' name="size" onClick= {this.updateShapeSize}>Small</h2>
                            <h2 value='medium' name="size" onClick= {this.updateShapeSize}>Medium</h2>
                            <h2 value='large' name="size" onClick= {this.updateShapeSize}>Large</h2>
                        </div>
                }
                {(this.state.strokeStyle || this.state.fillStyle) &&
                        <div className="attributes">
                            <h2 value='blue' name="fillStyle" onClick= {this.updateColor}>Blue</h2>
                            <h2 value='orange' name="fillStyle" onClick= {this.updateColor}>Orange</h2>
                            <h2 value='green' name="fillStyle" onClick= {this.updateColor}>Green</h2>
                        </div>
                }
               <div className="toolbox">
                   
                    <div className="shapePicker">
                            <div className="shape">
                                 <h2 value="circle" name="shape" onClick={this.updateShape}>Circle</h2>
                                 <h2 value="line" name="shape" onClick={this.updateShape}>Line</h2>
                                 <h2 value="rect" name="shape" onClick={this.updateShape}>Rectangle</h2>
                            </div>
                   </div>
                   <div className="tool">
                       <h2 value={!this.state.fillStyle} name="fillStyle" onClick={this.updateFillStyle}>Fill Color</h2>
                       <h2 value={!this.state.strokeStyle}  name="strokeStyle" onClick={this.updateStrokeStyle}>Border</h2>
                       <h2 value="delete" name="lineWidth" onClick={this.updateColor}>Delete</h2>
                   </div>
               </div>
           </div>
        )
    }
}
function mapStateToProps(state) {
    return {
        user:state.user
    }
}
export default connect(mapStateToProps)(CanvasDraw)