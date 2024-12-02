import GlobalStyle from "./styles/global.js";
import styled from "styled-components";
import Form from "./components/Form.js";
import Grid from "./components/Grid.js"
import {useEffect, useState} from "react"
import {toast, ToastContainer} from "react-toastify"; //Toast possibilita a criação de mensagens flutuantes
import "react-toastify/dist/ReactToastify.css";
import axios from "axios"

const Container = styled.div`
  width: 100%;
  max-width: 800px;
  margin-top: 20px;
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 10px;
`;

const Title = styled.h2``;

function App() {
  const [users, setUsers] = useState([])
  const [onEdit, setOnEdit] = useState(null)

  const getUsers = async () => {
    try{
      const res = await axios.get("http://localhost:8800/users");
      console.log("Resposta da API:", res.data);
      setUsers(res.data.sort((a,b) => (a.name > b.name ? 1 : -1)));
    } catch (error){
      toast.error(error)
    }
  };

  // Função para manipular a edição do usuário
  const handleEditUser = (user) => {
    console.log("Dados para edição:", {
      id: user._id,
      name: user.name,
      email: user.email,
    });
    setOnEdit({
      id: user._id, // Certifique-se de que o campo do ID corresponde ao que sua API retorna
      name: user.name,
      email: user.email,
    });
  };

  useEffect(() => {
    getUsers()
  },[setUsers])

  return (
    <>
      <Container>
        <Title>USUÁRIOS</Title>
        <Form onEdit={onEdit} setOnEdit={setOnEdit} getUsers={getUsers}/>
        <Grid users = {users} setUsers={setUsers} setOnEdit={setOnEdit} handleEditUser={handleEditUser}/>
      </Container>
      <ToastContainer autoClose={4000} position="bottom-left"/>
      <GlobalStyle/>
    </>
  );
}

export default App;
