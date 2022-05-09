import React, { useState, useEffect, ChangeEvent } from "react";
import { useHistory, useParams } from "react-router-dom";
import { Button, Form, Table } from "react-bootstrap";
import api from "../../../service/api";

import "./index.css";

interface IAlunos {
  id: number;
  nome: string;
  email: string;
  idade: string;
  listaNotas: INotas[];
}

interface INotas {
  idNotas: number;
  idAluno: number;
  idDisciplina: number;
  valor: string;
  disciplina: string;
}

const Alunos: React.FC = () => {
  const history = useHistory();
  const { id } = useParams<{ id: string }>();

  const [model, setModel] = useState<IAlunos>({
    id: 0,
    nome: "",
    email: "",
    idade: "",
    listaNotas: [],
  });

  useEffect(() => {
    if (id !== undefined) {
      findAluno(id);
    }
  }, [id]);

  function updateModel(e: ChangeEvent<HTMLInputElement>) {
    setModel({
      ...model,
      [e.target.name]: e.target.value,
    });
  }

  function updateModelNotas(e: ChangeEvent<HTMLInputElement>, index: number) {
    model.listaNotas[index].valor = e.target.value;
    setModel({
      id: model.id,
      nome: model.nome,
      email: model.email,
      idade: model.idade,
      listaNotas: model.listaNotas,
    });
  }

  async function onSubmit(e: ChangeEvent<HTMLFormElement>) {
    e.preventDefault();

    if (id !== undefined) {
      const response = await api.put(`/alunos/${id}`, model);
    } else {
      const response = await api.post("/alunos", model);
    }
    back();
  }

  async function findAluno(id: string) {
    const response = await api.get(`alunos/${id}`);
    setModel({
      id: response.data.id,
      nome: response.data.nome,
      email: response.data.email,
      idade: response.data.idade,
      listaNotas: response.data.listaNotas,
    });
  }

  function back() {
    history.goBack();
  }

  return (
    <div className="container">
      <br />
      <div className="alunos-header">
        <h3>Aluno</h3>
        <Button variant="primary" size="sm" onClick={back}>
          Voltar
        </Button>
      </div>
      <br />
      <div className="container">
        <Form onSubmit={onSubmit}>
          <Form.Group>
            <Form.Label>Nome</Form.Label>
            <Form.Control
              type="text"
              name="nome"
              value={model.nome}
              onChange={(e: ChangeEvent<HTMLInputElement>) => updateModel(e)}
            />
          </Form.Group>

          <Form.Group>
            <Form.Label>Email</Form.Label>
            <Form.Control
              type="email"
              name="email"
              value={model.email}
              onChange={(e: ChangeEvent<HTMLInputElement>) => updateModel(e)}
            />
          </Form.Group>

          <Form.Group>
            <Form.Label>Idade</Form.Label>
            <Form.Control
              type="text"
              name="idade"
              value={model.idade}
              onChange={(e: ChangeEvent<HTMLInputElement>) => updateModel(e)}
            />
          </Form.Group>
          <br/>
          {model.id ? (
            <Form.Group>
              <Table striped bordered hover>
                <thead>
                  <tr>
                    <th>Disciplina</th>
                    <th>Nota</th>
                  </tr>
                </thead>
                <tbody>
                  {model.listaNotas.map((INotas, index) => (
                    <tr key={INotas.idNotas}>
                      <td className="valor1"> {INotas.disciplina} </td>
                      <td className="valor">
                        <Form.Control
                          type="text"
                          name="listaNotas"
                          value={INotas.valor}
                          onChange={(e: ChangeEvent<HTMLInputElement>) =>
                            updateModelNotas(e, index)
                          }
                        />
                      </td>
                    </tr>
                  ))}
                </tbody>
              </Table>
            </Form.Group>
          ) : null } 
          <br />
          <Button variant="primary" type="submit">
            Salvar
          </Button>
        </Form>
      </div>
      <br />
    </div>
  );
};

export default Alunos;
