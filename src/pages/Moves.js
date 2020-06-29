import React from 'react';
import { useState } from 'react';
import Rest from '../usefull/rest';

const baseURL = 'https://mymoney-pauloteixeira.firebaseio.com/'
const { useGet, usePost, useDelete } = Rest(baseURL)

const Moves = ({ match }) => {
    const data = useGet(`movimentacoes/${match.params.data}`)
    const [postData, save] = usePost(`movimentacoes/${match.params.data}`)
    const [removeData, remove] = useDelete()
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
            await save({
                descricao: description,
                valor: parseFloat(value)  
            })
            setDescription('') 
            setValue(0)
            data.refetch()
        }
    }

    const removeMoves = async(id) => {
        await remove(`movimentacoes/${match.params.data}/${id}`)
        data.refetch()
    }
    
    return (
        <div className='container'>
            <h1>Movimentações</h1>
            <table className='table'>
                <thead>
                    <tr>
                        <th>Descrição</th>
                        <th>Valor</th>
                    </tr>
                </thead>
                <tbody>
                    { data.data &&   
                        Object
                            .keys(data.data)
                            .map(moves => {
                                return (
                                    <tr key={moves}>
                                        <td>
                                            {data.data[moves].descricao}
                                        </td>
                                        <td className='text-right'>
                                            {data.data[moves].valor} {' '}
                                            <button className='btn btn-danger' onClick={() => removeMoves(moves)}>-</button>
                                        </td>
                                    </tr>
                                )
                            })
                    }
                    <tr>
                        <td>
                            <input type='text' value={description} onChange={onChangeDescription}/>
                        </td>
                        <td>
                            <input type='text' value={value} onChange={onChangeValue}/>&ensp;
                            <button className='btn btn-success' onClick={saveMoves}>+</button>
                        </td>
                    </tr>
                </tbody>
            </table>
        </div>
    )
}

export default Moves;