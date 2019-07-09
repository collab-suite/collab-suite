import React, {Component} from 'react'
import {Line, Rect, Circle, FreeDraw, RectComplete, LineComplete} from './constructors'
import { SwatchesPicker } from 'react-color'
import {connect} from 'react-redux'
import './canvasdraw.css'

class CanvasDraw extends Component {
    constructor() {
        super()
        this.state =  {
        isPainting: false,
        tools: { fillStyle:'white', strokeStyle:'black', lineWidth: 5, radius: 30,},
        duplicateLastObj: {},
        newObj: {},
        shape: 'line',
        editObj: {},
        accordianTop: {shape: false, edit: false},
        initialAccordianTop: {shape: false, edit: false},
        accordian: {fillColor: false, lineColor: false, circle: false, line: false,rect: false, freeDraw: false},
        initialAccordian: {fillColor: false, lineColor: false, circle: false, line: false,rect: false, freeDraw: false}
        }
    }
    newObj = {}
    drawObj = []

    updateShape = (e) => {
        this.setState({
            shape: e
            })
        }

    updateShapeSize = (e) => {
        if (this.state.shape === 'circle') {
            if (e.target.attributes.value.value === 'small'){
                this.setState({ tools: {...this.state.tools, radius: 10}})
            } else if (e.target.attributes.value.value === 'medium') {
                this.setState({tools: {...this.state.tools,radius: 20} })
            } else if (e.target.attributes.value.value === 'large') {
                this.setState({ tools: {...this.state.tools,radius: 30 }})
            }
        } else if (this.state.shape ==='line' || this.state.shape ==='freeDraw') {
            if (e.target.attributes.value.value === 'small'){
                this.setState({ tools: {...this.state.tools,lineWidth: 2} })
            } else if (e.target.attributes.value.value === 'medium') {
                this.setState({tools: {...this.state.tools,lineWidth: 5}})
            } else if (e.target.attributes.value.value === 'large') {
                this.setState({ tools: {...this.state.tools,lineWidth: 10} })
            }
        }
        this.setState({
            shapeSize: false
        })
    }


    updateFillStyle = (color,event) => {
        this.setState({
            tools: {
                ...this.state.tools,
                fillStyle: color.hex
            }
        })
    }
    updateStrokeStyle = (color,event) => {
        this.setState({
            tools: {
                ...this.state.tools,
                strokeStyle: color.hex
            }
        })
    }

    deleteElement = (i) => {
        this.c.clearRect(0,0,1000,1000)
        this.drawObj.splice(this.state.selectElement.index, 1)
        for (let i = 0; i < this.drawObj.length; i++) {
            this.drawObj[i].draw(this.c)
        }
        this.setState({
            accordianTop: {
                edit: false
            }
        })
        this.setState({
        accordianTop: {
            edit: true
            },
        editObj: {
            
        }
        })
    }

    moveToBack = () => {
        this.c.clearRect(0,0,1000,1000)
        this.drawObj.splice(this.state.selectElement.index, 1)
        this.drawObj.unshift(this.state.selectElement.elem)
        for (let i = 0; i < this.drawObj.length; i++) {
            this.drawObj[i].draw(this.c)
        }
        this.setState({
            accordianTop: {
                edit: false
            }
        })
        this.setState({
        accordianTop: {
            edit: true
            }        
        })
    }

    moveBackOne = () => {
        this.c.clearRect(0,0,1000,1000)
        this.drawObj.splice(this.state.selectElement.index, 1)
        this.drawObj.splice(this.state.selectElement.index -1, 0, this.state.selectElement.elem)
        for (let i = 0; i < this.drawObj.length; i++) {
            this.drawObj[i].draw(this.c)
        }
        this.setState({
            accordianTop: {
                edit: false
            }
        })
        this.setState({
        accordianTop: {
            edit: true
            }        
        })
    }

    moveUpOne = () => {
        this.c.clearRect(0,0,1000,1000)
        this.drawObj.splice(this.state.selectElement.index, 1)
        this.drawObj.splice(this.state.selectElement.index +1,0, this.state.selectElement.elem)
        for (let i = 0; i < this.drawObj.length; i++) {
            this.drawObj[i].draw(this.c)
        }
        this.setState({
            accordianTop: {
                edit: false
            }
        })
        this.setState({
        accordianTop: {
            edit: true
            }        
        })
    }

    componentDidMount = () => {
        this.canvas.width = 900
        this.canvas.height = 600
        this.c = this.canvas.getContext('2d')
        this.c.lineJoin = 'round'
        this.c.lineCap = 'round'
        this.c.lineWidth = 2
        this.props.socket.on('drawObj',(newObj) => {
            console.log(newObj)
            this.c.clearRect(0,0,1000,1000)
            if (newObj.shape === 'circle') {
                let obj = new CircleComplete(newObj)
                obj.draw(this.c)
                this.drawObj.push(obj)
            } else if(newObj.shape === 'line') {
                let obj = new LineComplete(newObj)
                obj.draw(this.c)
                this.drawObj.push(obj)
            } else if(newObj.shape === 'rect') {
                let obj = new RectComplete(newObj)
                obj.draw(this.c)
                this.drawObj.push(obj)
            } else if(newObj.shape === 'freeDraw') {
                let obj = new FreeDrawComplete(newObj)
                obj.draw(this.c)
                this.drawObj.push(obj)
            }
            for (let i = 0; i < this.drawObj.length; i++) {
                this.drawObj[i].draw(this.c)
            }
        })
    }

    onMouseDown = ({nativeEvent}) => {
        const {offsetX: x, offsetY : y} = nativeEvent
        if (!this.state.edit) {
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
            } else if (this.state.shape ==='freeDraw') {
                const newFree = new FreeDraw(x,y,this.state.tools)
                this.newObj = newFree
            }
            this.setState({
                isPainting: true
            })
        } 
    }

    onMouseMove = ({nativeEvent}) => {
        if (this.state.isPainting === true){
            const {offsetX, offsetY} = nativeEvent
            if (this.state.shape === 'line' || this.state.shape === 'rect') {
                this.newObj.update(offsetX,offsetY)
            } else if (this.state.shape === 'freeDraw') {
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
        if (this.state.isPainting === true){
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
    }

    selectDrawObj = (elem, index) => {
        this.c.clearRect(0,0,1000,1000)
        for (let i = 0; i < this.drawObj.length; i++) {
            this.drawObj[i].draw(this.c)
        }
        elem.drawSelected(this.c)
        this.setState({
            selectElement: {
                elem,
                index:index
            },
            editObj: {
                [index]:true
            },
        })
    }

    displayElements = () => {
        let shapeList = this.drawObj.map((elem,i) => {
            return (
                    <>
                        <span onClick={() => this.selectDrawObj(elem, i)}><h2>{`${i + 1}: ${elem.constructor.name}`}</h2></span>
                            <div className={(this.state.editObj[i]) ? 'subSlideBody subActive' : 'subSlideBody'}>
                                <p value='delete' name="edit" onClick= {this.deleteElement}>Delete</p>
                                <p value='moveToBack' name="edit" onClick= {this.moveToBack}>{`<-`}</p>
                                <p value='moveUpOne' name="edit" onClick= {this.moveUpOne}>Move Up One</p>
                                <p value='moveBackOne' name="edit" onClick= {this.moveBackOne}>Move Back One</p>
                            </div>
                    </>
            )
        })
        return(shapeList)
    }

    makeActive = (e) => {
        // for (let i = 0; i < this.state.according.length)
        if (e.target.attributes.name.value in this.state.accordian) {
            if (e.target.attributes.name.value !== 'fillColor' && e.target.attributes.name.value !=='lineColor') {
                this.updateShape(e.target.attributes.name.value)
            }
            this.setState({
                accordian:{ ...this.state.initialAccordian,
                     [e.target.attributes.name.value]: !this.state.accordian[e.target.attributes.name.value]
                }
            })
        } else {
            this.setState({
                accordianTop:{ ...this.state.initialAccordianTop,
                     [e.target.attributes.name.value]: !this.state.accordianTop[e.target.attributes.name.value]
                }
            })
        }
    }


    render() {
        return(
           <div className="pageContainer">
               <div className="viewport">
                    <div className='elementList'>
                            <div className='slideHeader sliderText' name="shape" onClick={this.makeActive}>Shapes</div>
                                <div className={(this.state.accordianTop.shape) ? 'slideBody active' : 'slideBody'}>
                                    <h3 className=" sliderText slideHeader " value="freeDraw" name="freeDraw" onClick=    {this.makeActive}>Free Draw</h3>
                                    <div className={(this.state.accordian.freeDraw) ? 'subSlideBody subActive' : 'subSlideBody'}>
                                        <p className="sliderText" value='small' name="size" onClick= {this.updateShapeSize}>Small</p>
                                        <p className="sliderText" value='medium' name="size" onClick= {this.updateShapeSize}>Medium</p>
                                        <p className="sliderText" value='large' name="size" onClick= {this.updateShapeSize}>Large</p>
                                    </div>
                                    <h3 className=" slideHeader sliderText" value="line" name="line" onClick={this.makeActive}>Line</h3>
                                     <div className={(this.state.accordian.line) ? 'subSlideBody subActive' : 'subSlideBody'}>
                                        <p className="sliderText" value='small' name="size" onClick= {this.updateShapeSize}>Small</p>
                                        <p className="sliderText" value='medium' name="size" onClick= {this.updateShapeSize}>Medium</p>
                                        <p className="sliderText" value='large' name="size" onClick= {this.updateShapeSize}>Large</p>
                                    </div>
                                    <h3 className=" sliderText slideHeader " value="circle" name="circle" onClick={this.makeActive}>Circle</h3>
                                    <div className={(this.state.accordian.circle) ? 'subSlideBody subActive' : 'subSlideBody'}>
                                        <p className="sliderText" value='small' name="size" onClick= {this.updateShapeSize}>Small</p>
                                        <p className="sliderText" value='medium' name="size" onClick= {this.updateShapeSize}>Medium</p>
                                        <p className="sliderText" value='large' name="size" onClick= {this.updateShapeSize}>Large</p>
                                    </div>
                                    <h3 className="slideHeader sliderText" value="rect" name="rect" onClick={this.makeActive}>Rectangle</h3> 
                                     <div className={(this.state.accordian.rect) ? 'subSlideBody subActive' : 'subSlideBody'}> 
                                        <p className="sliderText" value='small' name="size" onClick= {this.updateShapeSize}>Small</p>
                                        <p className="sliderText" value='medium' name="size" onClick= {this.updateShapeSize}>Medium</p>
                                        <p className="sliderText" value='large' name="size" onClick= {this.updateShapeSize}>Large</p> 
                                    </div>
                                    <div className='slideHeader' name="fillColor" onClick={this.makeActive}>Fill Color</div>
                                        <div  className={(this.state.accordian.fillColor) ? 'subSlideBody subActiveCenter' : 'subSlideBody'}>
                                            <SwatchesPicker 
                                                width={175}
                                                height={400}
                                                onChange={this.updateFillStyle}
                                                />
                                         </div>
                                    <div className='slideHeader' name="lineColor"  onClick={this.makeActive}>Line Color</div>
                                        <div  className={(this.state.accordian.lineColor) ? 'subSlideBody subActiveCenter' : 'subSlideBody'} >
                                            <SwatchesPicker 
                                                width={175}
                                                height={395}
                                                onChange={this.updateStrokeStyle}
                                                />
                                        </div>
                                    
                                </div>
                            <div className='slideHeader' name="edit" onClick={this.makeActive}>Edit</div>
                            <div className={(this.state.accordianTop.edit) ? 'slideBody active' : 'slideBody'}>
                                {this.displayElements()}
                            </div>  
                         </div>
                         <canvas 
                               ref={(ref) => (this.canvas = ref)}
                               style={{ background: 'white' }}
                               onMouseDown={this.onMouseDown}
                            //    onMouseLeave={this.endPaintEvent}
                               onMouseUp={this.onMouseUp}
                               onMouseMove={this.onMouseMove}
                            />
                    </div>   
           </div>
        )
    }
}

function mapStateToProps(state) {
    return{
        user:state.user
    }
}

export default connect(mapStateToProps, )(CanvasDraw)