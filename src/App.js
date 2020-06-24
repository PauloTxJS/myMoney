import React from 'react';
import useGet from './useGet';
import usePost from './usePost';
import useDelete from './useDelete';
import axios from 'axios';

const url = 'https://mymoney-pauloteixeira.firebaseio.com/movimentacoes/2020-06.json'

function App() {
  const data = useGet(url)
  const [postData, post] = usePost(url)
  const [deleteData, remove] = useDelete()
  
  const saveNew = () => {
    post({ valor: 10, descricao: 'olá' })
  }

  const doRemove = () => {
    remove('https://mymoney-pauloteixeira.firebaseio.com/movimentacoes/2020-06/-MAXMhKoQ0yK0EbXEsao.json')
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
