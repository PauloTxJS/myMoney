import React, { useState } from 'react';

const AddMoves = ({ saveNewMoves }) => {
    const [description, setDescription] = useState('')
    const [value, setValue] = useState('')

    const onChangeDescription = evt => {
        setDescription(evt.target.value);
    } 

    const onChangeValue = evt => {
        setValue(evt.target.value);
    }

    const saveMoves = async() => {
        if (!isNaN(value) && value.search(/^[-]?\d+(\.)?\d+?$/) >= 0){
            await saveNewMoves({
                descricao: description,
                valor: parseFloat(value)  
            })
            setDescription('') 
            setValue(0)
        }
    }   

    return (
        <tr>
            <td>
                <input type='text' value={description} onChange={onChangeDescription}/>
            </td>
            <td>
                <input type='text' value={value} onChange={onChangeValue}/>&ensp;
                <button className='btn btn-success' onClick={saveMoves}>+</button>
            </td>
        </tr>
    )
}

export default AddMoves