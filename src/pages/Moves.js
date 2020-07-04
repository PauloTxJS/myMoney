import React from 'react';
import { useState } from 'react';
import Rest from '../usefull/rest';

const baseURL = 'https://mymoney-pauloteixeira.firebaseio.com/'
const { useGet, usePost, useDelete, usePatch } = Rest(baseURL)

const Moves = ({ match }) => {
    const data = useGet(`movimentacoes/${match.params.data}`)
    const dataMonths = useGet(`meses/${match.params.data}`)
    const [dataPatch, patch] = usePatch()
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
            await sleep(5000)
            dataMonths.refetch()
        }
    }

    const sleep = time => new Promise(resolve => setTimeout(resolve, time))
    const removeMoves = async(id) => {
        await remove(`movimentacoes/${match.params.data}/${id}`)
        data.refetch()
        await sleep(5000)
        dataMonths.refetch()        
    }

    const changeInputForecast = (evt) => {
        patch(`meses/${match.params.data}`, { previsao_entrada: evt.target.value})
    }
    
    const changeExitForecast = (evt) => {
        patch(`meses/${match.params.data}`, { previsao_saida: evt.target.value})
    }

    return (
        <div className='container'>
            <h1>Movimentações</h1>
            {
                !dataMonths.loading && dataMonths.data && <div>
                    <span>Previsão entrada: {dataMonths.data.previsao_entrada}</span> <input type='text' onBlur={changeInputForecast}/> / Previsão saída: {dataMonths.data.previsao_saida} <input type='text' onBlur={changeExitForecast}/> <br />
                    Entradas: {dataMonths.data.entradas} / Saídas: {dataMonths.data.saidas}
                    
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