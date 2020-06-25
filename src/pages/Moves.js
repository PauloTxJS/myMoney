import React from 'react';
import Rest from '../usefull/rest';

const baseURL = 'https://mymoney-pauloteixeira.firebaseio.com/'
const { useGet } = Rest(baseURL)

const Moves = ({ match }) => {
    const data = useGet(`movimentacoes/${match.params.data}`)
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
                                        <td>{data.data[moves].descricao}</td>
                                        <td>{data.data[moves].valor}</td>
                                    </tr>
                                )
                            })
                    }
                </tbody>
            </table>
        </div>
    )
}

export default Moves;