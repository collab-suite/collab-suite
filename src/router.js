import React from 'react'
import {Switch, Route} from 'react-router-dom'
import ParentDrawing from './Components/DrawingRoom/ParentDrawingRoom'
import Home from './Components/Home/Home'
import Profile from './Components/ProfilePage/ProfilePage'

export default (
    <Switch>
        <Route exact path='/' component={Home} />
        <Route path='/draw' component={ParentDrawing} />
        <Route path='/profile' component={Profile} />
    </Switch>
)