import React from 'react';
import Rest from './rest';

const baseURL = 'https://mymoney-pauloteixeira.firebaseio.com/'
const { useGet, usePost, useDelete } = Rest(baseURL)

function App() {
  //const data = useGet('movimentacoes/2020-06')
  const data = useGet('meses')
  //const [postData, post] = usePost('movimentacoes/2020-06')
  //const [deleteData, remove] = useDelete()
  
  const saveNew = () => {
    //post({ valor: 10, descricao: 'olá' })
  }

  const doRemove = () => {
    //remove('movimentacoes/2020-06/-MAYmHr3wB4Sbhp_w8dT')
  }

  return (
    <div>
      <nav className='navbar navbar-light bg-light'>
        <div className='container'>
          <a className='navbar-brand'>MyMoney</a>
        </div>  
      </nav>

      <div className='container'>
        <h2>Adicionar mês</h2>
        <select>
          <option value='2020'>2020</option>
          <option value='2021'>2021</option>
        </select>
        <select>
          <option value='01'>01</option>
          <option value='02'>02</option>
        </select>
        <button>Adicionar mês</button>
        {
          data.loading && <span>Carregando...</span>
        }
        {
          !data.loading && (
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
        <pre>{JSON.stringify(data)}</pre>
      </div>
    </div>
  );
}

export default App;
