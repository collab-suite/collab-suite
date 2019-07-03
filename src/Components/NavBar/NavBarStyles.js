import styled from 'styled-components'

export const NavBarHeader = styled.div`
    width: 100%;
    height: 200px;
    background: #fffffc;
    display: flex;
    justify-content: center;
    align-items: center;
`
export const NavBarOrganizer = styled.div`
    display: flex;
    align-items: center;
`

export const Logo = styled.img` 
    transform: scale(.27);
    margin: 0 -9%;
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
    border-radius: 5px;
    font-family: Arial;
    color: #0FA3B1;
    font-size: 20px;
    background: #fffffc;
    padding: 5px 10px;
    border: solid #0FA3B1 1.5px;
    text-decoration: none;
    &:hover {
        background: #0FA3B1;
        color: #fffffc;
        border-color: #fffffc;
        text-decoration: none;
    }
`

export const NavButtonTwo = styled.button`
    -webkit-border-radius: 5;
    -moz-border-radius: 5;
    border-radius: 5px;
    font-family: Arial;
    color: #0FA3B1;
    font-size: 20px;
    background: #fffffc;
    margin: .5%;
    padding: 5px 10px;
    border: solid #0FA3B1 1.5px;
    text-decoration: none;
    &:hover {
        background: #0FA3B1;
        color: #fffffc;
        border-color: #fffffc;
        text-decoration: none;
    }
`

export const LineBeforeOne = styled.div`
    height: 2px;
    width: 30rem;
    background: #0FA3B1;
    margin-right: 100px;
`

export const LineAfterOne = styled.div`
    height: 2px;
    width: 30rem;
    background: #0FA3B1;
    margin-left: 100px;
`

export const LineBeforeTwo = styled.div`
    height: 2px;
    width: 20rem;
    background: #0FA3B1;
    margin-right: 80px;
`

export const LineAfterTwo = styled.div`
    height: 2px;
    width: 20rem;
    background: #0FA3B1;
    margin-left: 80px;
`