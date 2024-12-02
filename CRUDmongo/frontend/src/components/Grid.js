import React from "react"
import styled from "styled-components"
import axios from "axios"
import {FaTrash, FaEdit} from "react-icons/fa"
import {toast} from "react-toastify"

const Table = styled.table`
    width: 100%;
    background-color: #fff;
    padding: 20px;
    box-shadow: 0px 0px 5px #ccc;
    border-radius: 5px;
    max-width: 800px;
    margin: 20px auto;
    word-break: break-all;
`
export const Thead = styled.thead``

export const Tbody = styled.tbody``

export const Tr = styled.tr``

export const Th = styled.th`
    text-align: start;
    border-bottom: inset;
    padding-bottom: 5px;

    @media(max-width: 500px){
        ${(props) => props.onlyWeb && "display: none"}
    }
`
export const Td = styled.td`
    padding-top: 15px;
    text-align: ${(props) => (props.alignCenter ? "center" : "start")}
    width: ${(props) => (props.align && props.align.width ? props.align.width : "auto")};

`

const Grid = ({users, setUsers, setOnEdit, handleEditUser}) =>{
    
    // Função para editar
    const handleEdit = (item) => {
        console.log("Editando item:", item);
        setOnEdit(item);
        handleEditUser(item); // Atualizar o estado no App.js
    }


    const handleDelete = async (id) => {
        console.log("Tentando deletar ID:", id); // Verificar o ID enviado
        await axios
            .delete("http://localhost:8800/users/"+id)
            .then(({data}) => {
                const newArray = users.filter((user) => user._id !== id)
                setUsers(newArray)
                toast.success(data)
            })
            .catch(({data}) => toast.error(data))
        setOnEdit(null);
    }

    return(
        <Table>
            <Thead>
                <Tr>
                    <Th>Nome</Th>
                    <Th>Email</Th>
                    {/* <Th onlyWeb>Fone</Th> */}
                    <Th></Th>
                    <Th></Th>
                </Tr>
            </Thead>
            <Tbody>
                {users.map((item, i) =>(
                    <Tr key= {i}>
                        <Td width="30%">{item.name}</Td>
                        <Td width="30%">{item.email}</Td>
                        {/* <Td width="20%" onlyWeb>{item.fone}</Td> */}
                        <Td alignCenter width="5%">
                            <FaEdit onClick={() => handleEdit(item)}/>
                        </Td>
                        <Td alignCenter width="5%">
                            <FaTrash onClick={()=> handleDelete(item._id)}/>
                        </Td>
                        <Td ></Td>

                    </Tr>

                ))}
            </Tbody>
        </Table>
    );
}

export default Grid