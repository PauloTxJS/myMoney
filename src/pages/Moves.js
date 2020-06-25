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
    const [value, setValue] = useState(0.0)
    
    const onChangeDescription = evt => {
        setDescription(evt.target.value);
    } 

    const onChangeValue = evt => {
        setValue( parseFloat(evt.target.value) );
    }
    
    const saveMoves = async() => {
        await save({
            descricao: description,
            valor: value  
        })
        setDescription('')
        setValue(0)
        data.refetch()
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
                                    <tr>
                                        <td>
                                            {data.data[moves].descricao}
                                        </td>
                                        <td>
                                            {data.data[moves].valor}
                                            <button onClick={() => removeMoves(moves)}>-</button>
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
                            <input type='text' value={value} onChange={onChangeValue}/>
                            <button onClick={saveMoves}>+</button>
                        </td>
                    </tr>
                </tbody>
            </table>
        </div>
    )
}

export default Moves;