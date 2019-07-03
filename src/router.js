import React from 'react'
import {Switch, Route} from 'react-router-dom'
import ParentDrawing from './Components/DrawingRoom/ParentDrawingRoom'
import Home from './Components/Home/Home'
import LoginModal from './Components/LoginModal/LoginModal'

export default (
    <Switch>
        <Route exact path='/' component={Home} />
        <Route path='/draw' component={ParentDrawing} />
        <Route path='/login' component={LoginModal} />
    </Switch>
)