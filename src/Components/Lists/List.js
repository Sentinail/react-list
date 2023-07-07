import axios from 'axios';
import React, { useEffect, useRef, useState } from 'react'
import { styled } from "styled-components";

const ListContainer = styled.div`
    width: 500px;
    height: 500px;
    background-color: #FFC19D;
    border-radius: 20px;
    position: relative;
    animation: fadeIn 1s ease-in-out;
    overflow: hidden;
    
    @keyframes fadeIn {
        0% {opacity: 0; bottom: 100px}
        100% {opacity: 1; bottom: 0px}
    }
    
    & * {
        transition: all 0.2s ease-in-out;
    }

    & button:hover {
        cursor: pointer;
        transform: scale(1.1);
    }

    & .list-header {
        width: 100%;
        height: 80px;
        background-color: #F05800;
        display: flex;
        align-items: center;
        justify-content: center;

        & h1 {
            color: #FFFFFF;
        }

    }

    & .list-body {
        width: 100%;
        height: calc(100% - 80px);
        padding: 30px;
        display: flex;
        flex-direction: column;
        gap: 30px;

        & .form {
            width: 100%;
            height: 100px;
            display: flex;
            justify-content: space-between;
            align-items: center;
            gap: 30px;

            & input {
                height: 30px;
                width: 300px;
                border-radius: 100px;
                text-align: center;
                border: none;
                outline-color: #F05800;
                font-family: 'Gill Sans', 'Gill Sans MT', Calibri, 'Trebuchet MS', sans-serif;
            }

            & button {
                height: 30px;
                width: 200px;
                background-color: #F05800;
                border: none;
                border-radius: 100px;
                font-family: 'Gill Sans', 'Gill Sans MT', Calibri, 'Trebuchet MS', sans-serif;
            }
        }

        & .lists {
            width: 100%;
            height: calc(100% - 100px);
            display: flex;
            flex-direction: column;
            gap: 10px;
            overflow-y: scroll;
            border: #F05800 2px solid;
            border-radius: 20px;
            padding: 30px;

            &::-webkit-scrollbar {
                display: none;
            }

            & .list-cell {
                flex-shrink: 0;
                & p {
                    text-align: center;
                    width: 100%;
                }
            }
        }
    }
`

const ListCellStyle = styled.div`
    width: 100%;
    min-height: 30px;
    background-color: #FFFFFF;
    border-radius: 100px;
    padding: 10px;
    position: relative;
    animation: fadeIn 0.5s ease-in-out;

    @keyframes fadeIn {
        0% {opacity: 0; top: 50px}
        100% {opacity: 1; top: 0px}
    }

    display: flex;
    justify-content: space-between;
    align-items: center;

    & button {
        width: 15px;
        height: 15px;
        border: none;
        border-radius: 100px;
    }
`


const ListCell = (props) => {
    const {data, id, getListData} = props

    const deleteItem = async () => {
        await axios.post("http://localhost:9000/list/remove", {
            listID: id
        })

        getListData()
    }

    return (
        <ListCellStyle className='list-cell'>
            <p>
                {data}
            </p>
            <button onClick={() => {deleteItem()}}>
                X
            </button>
        </ListCellStyle>
    )
}

function List() {

    const [listData, setListData] = useState([])
    const inputRef = useRef()

    const getListData = async () => {
        const data = await axios.get("http://localhost:9000/list")
        setListData(data.data)
    }

    useEffect(() => {
        getListData()
        
    }, [])

    const addItem = async (el) => {

        if (el.value.length <= 0) {
            alert("Mag Lagay Kanaman Ng Laman 🗿")
        } else {
            await axios.post("http://localhost:9000/list", {
                listData: el.value
            })
        }

        getListData()
    }

    return (
        <ListContainer>
            <div className='list-header'>
                <h1>🗿 BASTA LIST TO 🗿</h1>
            </div>
            <div className='list-body'>
                <div className='form'>
                    <input ref={inputRef} type='text' placeholder='Input List Item'></input>
                    <button onClick={() => {addItem(inputRef.current)}}> Add To List </button>
                </div>
                <div className='lists'>
                    {listData.length > 0 ? listData.map(data => {return <ListCell getListData={getListData} key={data.id} id={data.id} data={data.data}></ListCell>}) : null}
                </div>
            </div>

        </ListContainer>
    )
}

export default List