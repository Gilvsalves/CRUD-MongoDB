import React, { useEffect, useRef } from "react";
import styled from "styled-components";
import axios from "axios";
import { toast } from "react-toastify";


// Estilização dos componentes
const FormContainer = styled.form`
  display: flex;
  align-items: flex-end;
  gap: 10px;
  flex-wrap: wrap;
  background-color: #fff;
  padding: 20px;
  box-shadow: 0px 0px 5px #ccc;
  border-radius: 5px;
`;

const InputArea = styled.div`
  display: flex;
  flex-direction: column;
`;

const Input = styled.input`
  width: 120px;
  padding: 0 10px;
  border: 1px solid #bbb;
  border-radius: 5px;
  height: 40px;
`;

const Label = styled.label``;

const Button = styled.button`
  padding: 10px;
  cursor: pointer;
  border-radius: 5px;
  border: none;
  background-color: #2c73d2;
  color: white;
  height: 42px;
`;

const Form = ({ getUsers, onEdit, setOnEdit }) => {
  const nameRef = useRef();
  const emailRef = useRef();

  useEffect(() => {
    if (onEdit) {
      // Preencher os campos do formulário com os valores recebidos
      nameRef.current.value = onEdit.name || "";
      emailRef.current.value = onEdit.email || "";
    }
  }, [onEdit]);

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Acessar os valores diretamente das referências dos campos
    const name = nameRef.current.value;
    const email = emailRef.current.value;

    if (!name || !email) {
      return toast.warn("Preencha todos os campos!");
    }

    const userData = {
      name,
      email,
    };

    console.log("Dados enviados:", userData); // Verifique os dados antes de enviar

    try {
        if (onEdit) {
          // Verificar se o ID de edição está presente
          if (!onEdit.id) {
            return toast.error("ID do usuário não encontrado!");
          }
          
          // Atualizar usuário existente
          await axios.put(`http://localhost:8800/users/${onEdit.id}`, userData, {
            headers: {
              'Content-Type': 'application/json',
            },
          });
          toast.success("Usuário atualizado com sucesso!");
        } else {
          // Criar novo usuário
          await axios.post("http://localhost:8800/users/", userData, {
            headers: {
              'Content-Type': 'application/json',
            },
          });
          toast.success("Usuário criado com sucesso!");
        }
      // Limpar os campos após o envio
      nameRef.current.value = "";
      emailRef.current.value = "";
      setOnEdit(null);
      getUsers();
    } catch (error) {
      console.log("Erro no envio:", error.response); // Veja o erro detalhado
      toast.error("Erro ao salvar o usuário!");
    }
  };

  return (
    <FormContainer onSubmit={handleSubmit}>
      <InputArea>
        <Label>Nome</Label>
        <Input ref={nameRef} name="name" />
      </InputArea>
      <InputArea>
        <Label>E-mail</Label>
        <Input ref={emailRef} name="email" type="email" />
      </InputArea>
      {/* <InputArea>
        <Label>Telefone</Label>
        <Input name="fone" />
      </InputArea>
      <InputArea>
        <Label>Data de nascimento</Label>
        <Input name="data_nascimento" type="date" />
      </InputArea> */}
      <Button type="submit">SALVAR</Button>
    </FormContainer>
  );
};

export default Form;
