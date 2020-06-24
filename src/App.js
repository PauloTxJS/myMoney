import React from 'react';
import Rest from './rest';

const baseURL = 'https://mymoney-pauloteixeira.firebaseio.com/'
const { useGet, usePost, useDelete } = Rest(baseURL)

function App() {
  const data = useGet('movimentacoes/2020-06')
  const [postData, post] = usePost('movimentacoes/2020-06')
  const [deleteData, remove] = useDelete()
  
  const saveNew = () => {
    post({ valor: 10, descricao: 'olá' })
  }

  const doRemove = () => {
    remove('movimentacoes/2020-06/-MAYmHr3wB4Sbhp_w8dT')
  }

  return (
    <div>
      <h1>MyMoney</h1>
      { JSON.stringify(data) }
      { data.loading && <p>Loading...</p> }
      <button onClick={saveNew}>Salvar</button>
      <pre>{JSON.stringify(postData)}</pre>
      <button onClick={doRemove}>Deletar</button>
      <pre>{JSON.stringify(deleteData)}</pre>
    </div>
  );
}

export default App;
