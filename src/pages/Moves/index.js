import React from 'react';
import { Redirect } from 'react-router-dom';
import { useMovesApi } from '../../api';
import InfoMonth from './InfoMonth';
import AddMoves from './AddMoves';

const Moves = ({ match }) => {
    const { moves, saveNewMoves, removeMoves } = useMovesApi(match.params.data)
    
    const saveMoves = async(datas) => {
        await saveNewMoves(datas)
        moves.refetch()
        await sleep(5000)
        //infoMonth.refetch()    
    }

    const sleep = time => new Promise(resolve => setTimeout(resolve, time))
    const removeMovesClick = async(id) => {
        await removeMoves(`movimentacoes/${match.params.data}/${id}`)
        moves.refetch()
        await sleep(5000)
        //infoMonth.refetch()        
    }

    if(moves.error === 'Permission denied') {
        return <Redirect to='/login'/>
    }
    
    return (
        <div className='container'>
            <h1>Movimentações</h1>
            <InfoMonth data={match.params.data}/>
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
                            .map(move => {
                                return (
                                    <tr key={move}>
                                        <td>
                                            {moves.data[move].descricao}
                                        </td>
                                        <td className='text-right'>
                                            {moves.data[move].valor} {' '}
                                            <button className='btn btn-danger' onClick={() => removeMovesClick(moves)}>-</button>
                                        </td>
                                    </tr>
                                )
                            })
                    }
                    <AddMoves saveNewMoves={saveMoves}/>
                </tbody>
            </table>
        </div>
    )
}

export default Moves;