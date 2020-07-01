import React from 'react';
import { Link } from 'react-router-dom';
import Rest from '../../usefull/rest';

const baseURL = 'https://mymoney-pauloteixeira.firebaseio.com/'
const { useGet } = Rest(baseURL)

const Months = () => {

    const data = useGet('meses')

    if (data.loading) {

        return <span>Carregando...</span>

    } 

    if (Object.keys(data.data).length > 0) {
        return (
            <table className='table'>
                <thead>
                    <tr>
                        <th>Mês</th>
                        <th>Previsão Entrada</th>
                        <th>Entrada</th>
                        <th>Previsão Saída</th>
                        <th>Saída</th>
                    </tr>
                </thead>
                <tbody>
                    {
                    Object
                        .keys(data.data)
                        .map(month => {
                            return(
                                <tr key={month}>
                                    <td><Link to={`/movimentacoes/${month}`}>{month}</Link></td>
                                    <td>{data.data[month].previsao_entrada}</td>
                                    <td>{data.data[month].entradas}</td>
                                    <td>{data.data[month].previsao_saida}</td>
                                    <td>{data.data[month].saidas}</td>
                                </tr>
                            )
                        })
                    }  
                </tbody>
            </table>       
        )
    }
    return null
}

export default Months