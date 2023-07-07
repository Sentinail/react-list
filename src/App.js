import React, { useRef } from 'react'
import GlobalStyles from './GlobalStyles'
import List from './Components/Lists/List'
import { motion } from 'framer-motion'
import { styled } from 'styled-components'

const SenkoSection = styled.div`
    position: relative;
    width: 100%;
    height: 100px;
    animation: fadeIn 1s ease-in-out;
        
    @keyframes fadeIn {
        0% {opacity: 0; bottom: 100px}
        100% {opacity: 1; bottom: 0px}
    }


    & #senko {
        width: 100px;
        height: auto;
        z-index: 100;
        position: absolute;
        bottom: 0;
        animation: fadeIn 1s ease-in-out;
        
        @keyframes fadeIn {
            0% {opacity: 0; bottom: 100px}
            100% {opacity: 1; bottom: 0px}
        }

        &:hover {
            cursor: grab;
        }
    }
`

function App() {
    const parentRef = useRef()

    return (
        <>
            <GlobalStyles></GlobalStyles>
            <SenkoSection ref={parentRef}>
                <motion.img 
                drag 
                dragConstraints={parentRef}
                id='senko' 
                src={require("./Assets/Images/Senko.png")} 
                alt="senko">
                </motion.img>
            </SenkoSection>
            <List></List>
        </>
    )
}

export default App