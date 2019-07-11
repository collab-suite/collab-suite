import React, {Component} from 'react'
import {Line, Rect, Circle, FreeDraw, FreeDrawComplete, CircleComplete, RectComplete, LineComplete} from './constructors'
import { SwatchesPicker } from 'react-color'
import {connect} from 'react-redux'
import './Canvas.css'

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

    deleteElement = (i,source) => {
        if (source ==='local') {
            this.props.socket.emit('deleteObj',i,this.props.user.roomID)
        }
        this.c.clearRect(0,0,1000,1000)
        this.drawObj.splice(i, 1)
        for (let i = 0; i < this.drawObj.length; i++) {
            this.drawObj[i].draw(this.c)
        }
        if (this.state.accordianTop) {
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
    }

    moveToBack = (i, element, source) => {
        if (source ==='local') {
            this.props.socket.emit('moveToBack',i, element, this.props.user.roomID)
        }
        this.c.clearRect(0,0,1000,1000)
        this.drawObj.splice(i, 1)
        this.drawObj.unshift(element)
        console.log(this.drawObj)
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
        this.canvas.width = 700
        this.canvas.height = 500
        this.c = this.canvas.getContext('2d')
        this.c.lineJoin = 'round'
        this.c.lineCap = 'round'
        this.c.lineWidth = 2
        this.props.socket.on('drawObj',(newObj) => {
            console.log('hitting socket on')
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
        this.props.socket.on('deleteObj',(index) => {
            this.deleteElement(index, 'sockets')
        })
        this.props.socket.on('moveToBack',(index,element) => {
            if (element.shape === 'circle') {
                let obj = new CircleComplete(element)
                this.moveToBack(index,obj, 'sockets')
            } else if(element.shape === 'line') {
                let obj = new LineComplete(element)
                this.moveToBack(index,obj, 'sockets')
            } else if(element.shape === 'rect') {
                let obj = new RectComplete(element)
                this.moveToBack(index,obj, 'sockets')
            } else if(element.shape === 'freeDraw') {
                let obj = new FreeDrawComplete(element)
                this.moveToBack(index,obj, 'sockets')
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
            this.props.socket.emit('drawObj',this.newObj,this.props.user.roomID)
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
                    <span onClick={() => this.selectDrawObj(elem, i)}>
                        <h2>{`${i + 1}: ${elem.shape}`}</h2>
                    </span>
                        <div className={(this.state.editObj[i]) ? 'subSlideBody subActive' : 'subSlideBody'}>
                            <p value='delete' name="edit" onClick= {() => {this.deleteElement(i,'local')}}>Delete</p>
                            <p value='moveToBack' name="edit" onClick= {() => {this.moveToBack(i,elem,'local')}}>{`<-`}</p>
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
                console.log('hitting accordion and not fill color')
                this.updateShape(e.target.attributes.name.value)
            }
            this.setState({
                accordian:{ ...this.state.initialAccordian,
                     [e.target.attributes.name.value]: !this.state.accordian[e.target.attributes.name.value]
                }
            })
        } else {
            console.log('hitting top accordions')
            this.setState({
                accordianTop:{ ...this.state.initialAccordianTop,
                     [e.target.attributes.name.value]: !this.state.accordianTop[e.target.attributes.name.value]
                }
            })
        }
    }


    render() {
        console.log(this.props)
        return(
           <div className="row">
               {/* pageContainer */}
               <div className="col">
                   {/* viewport */}
                    <div className='tabs'> 
                    {/* elementList */}
                        <div className='tab1'>
                        <input type='checkbox' id='chck' />
                        <label className='tab1-slideHeader' for='chck' name="shape" onClick={this.makeActive}>Tools</label>
                            <div className={(this.state.accordianTop.shape) ? 'tab-slideBody tab-active' : 'tab-slideBody'}>
                                <div className='tab'>
                                    <input type='checkbox' id='chck1' />
                                    <label className="tab-slideHeader" for='chck1' value="freeDraw" name="freeDraw" onClick={this.makeActive}>Marker</label>
                                    <div className={(this.state.accordian.freeDraw) ? 'tab-subSlideBody tab-subActive' : 'tab-subSlideBody'}>
                                        <div className="tab-sliderText" value='small' name="size" onClick= {this.updateShapeSize}>Small</div>
                                        <div className="tab-sliderText" value='medium' name="size" onClick= {this.updateShapeSize}>Medium</div>
                                        <div className="tab-sliderText" value='large' name="size" onClick= {this.updateShapeSize}>Large</div>
                                    </div>
                                </div>
                                <div className='tab'>
                                    <input type='checkbox' id='chck2' />
                                    <label className=" tab-slideHeader" for='chck2' value="line" name="line" onClick={this.makeActive}>Line</label>
                                    <div className={(this.state.accordian.line) ? 'tab-subSlideBody tab-subActive' : 'tab-subSlideBody'}>
                                        <div className="tab-sliderText" value='small' name="size" onClick= {this.updateShapeSize}>Small</div>
                                        <div className="tab-sliderText" value='medium' name="size" onClick= {this.updateShapeSize}>Medium</div>
                                        <div className="tab-sliderText" value='large' name="size" onClick= {this.updateShapeSize}>Large</div>
                                    </div>
                                </div>
                                <div className='tab'>
                                    <input type='checkbox' id='chck3' />
                                    <label className=" tab-slideHeader" for='chck3' value="circle" name="circle" onClick={this.makeActive}>Circle</label>
                                    <div className={(this.state.accordian.circle) ? 'tab-subSlideBody tab-subActive' : 'tab-subSlideBody'}>
                                        <div className="tab-sliderText" value='small' name="size" onClick= {this.updateShapeSize}>Small</div>
                                        <div className="tab-sliderText" value='medium' name="size" onClick= {this.updateShapeSize}>Medium</div>
                                        <div className="tab-sliderText" value='large' name="size" onClick= {this.updateShapeSize}>Large</div>
                                    </div>
                                </div>
                                <div className='tab2'>
                                    <input type='checkbox' id='chck4' />
                                    <label className="tab2-slideHeader" for='chck4' value="rect" name="rect" onClick={this.makeActive}>Rectangle</label> 
                                </div>
                                <div className='tab'>
                                    <input type='checkbox' id='chck5' />
                                    <label className='tab-slideHeader' for='chck5' name="fillColor" onClick={this.makeActive}>Fill Color</label>
                                    <div  className={(this.state.accordian.fillColor) ? 'tab-subSlideBody tab-subActiveCenter' : 'tab-subSlideBody'}>
                                        <SwatchesPicker 
                                            width={175}
                                            height={400}
                                            onChange={this.updateFillStyle}
                                            />
                                    </div>
                                </div>
                                <div className='tab'>
                                    <input type='checkbox' id='chck6' />
                                    <label className='tab-slideHeader' for='chck6' name="lineColor"  onClick={this.makeActive}>Line Color</label>
                                    <div  className={(this.state.accordian.lineColor) ? 'tab-subSlideBody tab-subActiveCenter' : 'tab-subSlideBody'} >
                                        <SwatchesPicker 
                                            width={175}
                                            height={395}
                                            onChange={this.updateStrokeStyle}
                                            />
                                    </div>
                                </div>
                            </div>
                            </div>
                            <div className='tab1'>
                                <input type='checkbox' id='chck7' />
                                <label className='tab1-slideHeader' for='chck7' name="edit" onClick={this.makeActive}>Edit</label>
                                <div className={(this.state.accordianTop.edit) ? 'tab-slideBody tab-active' : 'tab-slideBody'}>
                                    {this.displayElements()}
                                </div>
                            </div>  
                        </div>
                        <canvas 
                            className='cool-stuff-bro'
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