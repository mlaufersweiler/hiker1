import styled from "styled-components"

export const InvisibleHeader = styled.div`
height: 15%;
@media (max-width: 600px) {
  height: 10%;
}
`


export const Title = styled.h1`
  position: absolute; 
  top: 20px;
  letter-spacing: 2px;
  text-decoration: none;
  left: 120px;
  color: white;
  font-size: 32px;
    
  :before {
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
:hover:before {
  visibility: visible;
  -webkit-transform: scaleX(1);
  transform: scaleX(1);
}
    @media (max-width: 600px) {
      left: 65px;
      top: 1px;
      font-size: 24px;
    }
    `

    export const Button = styled.button`
    position: absolute;
    top: 41px;
    right: 15px;
    min-width: 30px;
    min-height: 25px;
    background: black;
    border-radius: 3px;
    text-transform: uppercase;
    border: 2px solid black;
    box-shadow: 0 1px 4px rgba(0, 0, 0, 0.3);
    color: white;
    margin: 0.5em 1em;
    padding: 0.6em 2em;
    font-size: 14px;
    
    
    @media (max-width: 600px) {
      top: 16px;
      max-width: 100px;
    right: 2px;
   
    min-height: 10px;
    font-size: 10px;
    }
     `

   export const UserGreeting = styled.p`
    font-size: 16px;
    color: white;
    position: absolute;
    top: 40px;
    right: 165px;
    @media (max-width: 600px) {
    font-size: 12px;
    margin: 4px 0px;
    color: white;
    position: absolute;
    top: 2px;
    right: 18px;
    }
    `