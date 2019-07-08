import styled from 'styled-components'

export const NavBarHeader = styled.div`
    width: 100vw;
    height: 200px;
    background: #fffffc;
    display: flex;
    justify-content: center;
    // align-items: center;
`
export const NavBarOrganizer = styled.div`
    display: flex;
    align-items: center;
`

export const Logo = styled.img` 
    transform: scale(.27);
    margin: 0 -10%;
`

export const ButtonHolder = styled.div`
    display: flex;
    align-items: center;
    justify-content: center;
`

export const ButtonHolderTwo = styled.div`
    display: flex;
    align-items: center;
    justify-content: center;
`

export const NavButton = styled.button`
    -webkit-border-radius: 5;
    -moz-border-radius: 5;
    border-radius: 50px;
    font-family: Roboto, sans-serif;
    text-transform: uppercase;
    color: #0FA3B1;
    font-size: 20px;
    background: #fffffc;
    padding: 10px 30px;
    border: solid #0FA3B1 1.5px;
    text-decoration: none;
    outline: none;
    &:hover {
        background: #0FA3B1;
        color: #fffffc;
        border-color: #0FA3B1;
        text-decoration: none;
    }
`

export const NavButtonTwo = styled.button`
    -webkit-border-radius: 5;
    -moz-border-radius: 5;
    border-radius: 50px;
    font-family: Roboto, sans-serif;
    color: #0FA3B1;
    font-size: 20px;
    background: #fffffc;
    text-transform: uppercase;
    margin: 20px;
    padding: 10px 30px;
    border: solid #0FA3B1 1.5px;
    text-decoration: none;
    outline: none;
    &:hover {
        background: #0FA3B1;
        color: #fffffc;
        border-color: #0FA3B1;
        text-decoration: none;
    }
`

export const LineBeforeOne = styled.div`
    height: 2px;
    width: 20rem;
    background: #0FA3B1;
    margin-right: 50px;
`

export const LineAfterOne = styled.div`
    height: 2px;
    width: 20rem;
    background: #0FA3B1;
    margin-left: 50px;
`

export const LineBeforeTwo = styled.div`
    height: 2px;
    width: 20rem;
    background: #0FA3B1;
    margin-right: 50px;
`

export const LineAfterTwo = styled.div`
    height: 2px;
    width: 20rem;
    background: #0FA3B1;
    margin-left: 50px;
`