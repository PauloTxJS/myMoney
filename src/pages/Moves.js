import React from 'react';
import { Redirect } from 'react-router-dom';
import { useState } from 'react';
import Rest from '../usefull/rest';

const baseURL = 'https://mymoney-pauloteixeira.firebaseio.com/'
const { useGet, usePost, useDelete, usePatch } = Rest(baseURL)

const Moves = ({ match }) => {
    const infoMonth = useGet(`meses/${match.params.data}`)
    const [dataPatch, changeMonth] = usePatch(`meses/${match.params.data}`)

    const moves = useGet(`movimentacoes/${match.params.data}`)
    const [postData, saveNewMoves] = usePost(`movimentacoes/${match.params.data}`)
    const [removeData, removeMoves] = useDelete()

    //Form management
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
            moves.refetch()
            await sleep(5000)
            infoMonth.refetch()
        }
    }

    const sleep = time => new Promise(resolve => setTimeout(resolve, time))
    const removeMovesClick = async(id) => {
        await removeMoves(`movimentacoes/${match.params.data}/${id}`)
        moves.refetch()
        await sleep(5000)
        infoMonth.refetch()        
    }

    const changeInputForecast = (evt) => {
        changeMonth({ previsao_entrada: evt.target.value})
    }
    
    const changeExitForecast = (evt) => {
        changeMonth({ previsao_saida: evt.target.value})
    }

    if(moves.error === 'Permission denied') {
        return <Redirect to='/login'/>
    }
    
    return (
        <div className='container'>
            <h1>Movimentações</h1>
            {
                !infoMonth.loading && infoMonth.data && <div>
                    <span>Previsão entrada: {infoMonth.data.previsao_entrada}</span> <input type='text' onBlur={changeInputForecast}/> / Previsão saída: {infoMonth.data.previsao_saida} <input type='text' onBlur={changeExitForecast}/> <br />
                    Entradas: {infoMonth.data.entradas} / Saídas: {infoMonth.data.saidas}
                    
                </div>
            }
            <table className='table'>
                <thead>
                    <tr>
                        <th>Descrição</th>
                        <th>Valor</th>
                    </tr>
                </thead>
                <tbody>
                    { moves.data &&   
                        Object
                            .keys(moves.data)
                            .map(moves => {
                                return (
                                    <tr key={moves}>
                                        <td>
                                            {moves.data[moves].descricao}
                                        </td>
                                        <td className='text-right'>
                                            {moves.data[moves].valor} {' '}
                                            <button className='btn btn-danger' onClick={() => removeMovesClick(moves)}>-</button>
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