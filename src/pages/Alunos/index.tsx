import React, { useState, useEffect } from "react";
import { Button, Table } from "react-bootstrap";
import { useHistory } from 'react-router-dom'
import api from "../../service/api";

import './index.css'


interface IAlunos {
    id: number;
    nome: string;
    email: string;
    idade: string;
}

const Alunos: React.FC = () => {
  const [alunos, setAlunos] = useState<IAlunos[]>([]);

  const history = useHistory();

  useEffect(() => {
    loadAlunos();
  }, []);

  async function loadAlunos() {
    const response = await api.get("/alunos");
    console.log(response);
    setAlunos(response.data);
  }

  async function deleteAluno(id: number) {
    await api.delete(`/alunos/${id}`)
    loadAlunos()
  }

  function newAluno() {
      history.push('/alunos_cadastro')
  }

  function editAluno(id: number) {
      history.push(`/alunos_cadastro/${id}`)
  }

  return (
    <div className="container">
      <br />
      <div className="alunos-header">
            <h1>Alunos Page</h1>
            <Button variant="primary" size="sm" onClick={newAluno}>Novo Aluno</Button>
      </div>
      <br />
      <Table striped bordered hover>
        <thead>
          <tr>
            <th>ID</th>
            <th>Nome</th>
            <th>Email</th>
            <th>Idade</th>
            <th>Ações</th>
          </tr>
        </thead>
        <tbody>
          {alunos.map(aluno => (
            <tr key={aluno.id}>
              <td> {aluno.id} </td>
              <td> {aluno.nome} </td>
              <td> {aluno.email} </td>
              <td> {aluno.idade} </td>
              <td>
                <Button size='sm' variant="warning" onClick={() => editAluno(aluno.id)}>Editar</Button>{' '}
                <Button size='sm' variant="danger" onClick={() => deleteAluno(aluno.id)}>Excluir</Button>{' '}
              </td>
            </tr>
          ))}
        </tbody>
      </Table>
    </div>
  );
};

export default Alunos;
