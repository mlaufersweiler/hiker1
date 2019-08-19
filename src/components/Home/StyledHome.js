import styled from "styled-components"

export const LinkButtons = styled.div`
a {
  color: white;
  font-family: 'Montserrat', sans-serif;
  margin: 3em;
  text-decoration: none;
  position: relative;
  color: white;
}
a:before {
  content: "";
  position: absolute;
  width: 100%;
  height: 2px;
  bottom: 0;
  left: 0;
  background-color: white;
  visibility: hidden;
  -webkit-transform: scaleX(0);
  transform: scaleX(0);
  -webkit-transition: all 0.3s ease-in-out 0s;
  transition: all 0.3s ease-in-out 0s;
}
a:hover:before {
  visibility: visible;
  -webkit-transform: scaleX(1);
  transform: scaleX(1);
}
background: none;
border: none;
width: 100%;
display: flex;
justify-content: center;
min-width: 30px;
min-height: 25px;
font-size: 1.5em;
color: white;

@media (max-width: 700px){
    margin-top: 2em;
    font-size: 1em;
    display: flex;
    justify-content: center;
    align-items: center;
    
    a:hover{
    font-weight: normal;
    font-weight: bolder;
    border-bottom: none; 
    }
}
`

export const ContentBox = styled.div`
position: absolute;
top: 40vh;
left: 10vw;
width: 50%;
max-width: 550px;
margin: 20px;
padding: 20px;
background-color: rgba(255, 255, 255, 0.7);
/* box-shadow: -3px 3px black;   */
@media (max-width: 600px) {
    width: 65%;
}
@media (max-width: 420px) {
    width: 100%;
    height: 50%;
    /* align-items: left; */
}
`
export const MainHeading = styled.h1`
text-transform: uppercase;
font-size: 1.5em;
letter-spacing: 0.5px;
text-align: left;
margin: 15px 15px 5px 15px;
@media (max-width: 900px) {
    font-size: 1.2em
}
@media (max-width: 675px) {
    font-size: 1em
}
`

export const Details = styled.p`
font-size: .95em;
text-align: left;
line-height: 1.3em;
margin: 12px 15px 10px 15px;
@media (max-width: 1000px) {
    font-size: .8em
}
@media (max-width: 370px) {
    font-size: .7em
}
`

export const Button = styled.button`
a {
    text-decoration: none;
    color: black;
}
a:visited {
    color: black;
}
 padding: 15px 15px;
 font-size: 12px;
 font-weight: bolder;
 cursor: pointer;
 width: 12em;
border: 2px solid rgb(89, 89, 89);
/* border-left: 1px solid rgb(89, 89, 89); */
box-shadow: -1px 1px 1px black;  
margin: 10px;
box-sizing: border-box;
text-transform: uppercase;
color: white;
text-align: center;
    background-color: rgba(255, 255, 255, 0);
    border-radius: 10px;
    @media (max-width: 1000px) {
        font-size: 8px;
        padding: 10px 10px;
    }
    @media (max-width: 460px) {
        font-size: 6px;
        padding: 10px 10px;
    }
`