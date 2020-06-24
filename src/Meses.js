import React from 'react';
import Rest from './rest';

const baseURL = 'https://mymoney-pauloteixeira.firebaseio.com/'
const { useGet } = Rest(baseURL)

const Meses = () => {

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
                        .map(mes => {
                            return(
                                <tr key={mes}>
                                    <td>{mes}</td>
                                    <td>{data.data[mes].previsao_entrada}</td>
                                    <td>{data.data[mes].entrada}</td>
                                    <td>{data.data[mes].previsao_saida}</td>
                                    <td>{data.data[mes].saida}</td>
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

export default Meses