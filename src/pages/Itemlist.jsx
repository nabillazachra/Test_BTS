import React, { useState, useEffect } from "react";
import { Container, Table } from "react-bootstrap";
import { useParams } from "react-router";
import { useNavigate } from "react-router";
import { API } from "../config/api";

export default function Checklist() {
    const {id} = useParams()
    const nav = useNavigate()
    const [list, setList] = useState([]);
    const getList = async () => {
        try {
          const response = await API.get(`/item/${id}`);
          setList(response.data.data);
        } catch (error) {
          console.log(error);
        }
      };
      const deleteData = async (id) => {
        try {
          const response = await API.delete(`/checklist/${id}`);
          getList();
        } catch (error) {
          console.log(error);
        }
      };
      useEffect(() => {
        getList();
      }, []);
    return (
    <>
        <Container className="mt-5">
            <button className="mb-3" onClick={()=>nav("/item-add")}>Add Data</button>
        
            <Table striped bordered hover>
            <thead>
                <tr>
                <th>No</th>
                <th>First Name</th>
                </tr>
            </thead>
            <tbody>
                <tr>
                    <td>{list?.id}</td>
                    <td>{list?.name}</td>
                    <td><button onClick={()=>deleteData(list?.id)}>delete</button></td>
                </tr>
            </tbody>
            </Table>
        </Container>
    </>
    )
}
