import styled from 'styled-components'

export const NavBarHeader = styled.div`
    width: 100%;
    height: 15%;
    background: #0FA3B1;
    opacity: 75%;
    display: flex;
    justify-content: center;
    align-items: center;
`
export const NavBarOrganizer = styled.div`
    width: 80%;
    background: yellow;
    height: 30%;
    display: flex;
    justify-content: space-between;
    align-items: center;
`

export const Logo = styled.img`
    display: block;
    margin: 0;
    padding: 0;
    background: blue;
    transform: scale(.15)
`

export const ButtonHolder = styled.div`
    height: 100%;
    width: 18%;
    display: flex;
    justify-content: space-between;
    align-items: center;
    background: indianred;
`

export const ButtonHolderTwo = styled.div`
    height: 100%;
    width: 22%;
    display: flex;
    justify-content: space-between;
    align-items: center;
    background: indianred;
`

export const NavButton = styled.button`
    height: 100%;
    width: 70px;
    border: 1px solid black;
    background: #fffffc;
`