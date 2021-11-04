import React, { useState, useEffect } from "react";
import { Container, Table } from "react-bootstrap";
import { useNavigate } from "react-router";
import { API } from "../config/api";

export default function Checklist() {
    const nav = useNavigate()
    const [list, setList] = useState([]);
    const getList = async () => {
        try {
          const response = await API.get("/checklist");
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
            <button className="mb-3" onClick={()=>nav("/add-list")}>Add Data</button>
        {list.map((item, index)=>(
            <Table striped bordered hover>
            <thead>
                <tr>
                <th>No</th>
                <th>First Name</th>
                </tr>
            </thead>
            <tbody>
                <tr>
                    <td>{item.id}</td>
                    <td>{item.name}</td>
                    <td><button onClick={()=>deleteData(item.id)}>delete</button></td>
                    <td><button onClick={()=>nav("/item-list/"+item.id)}>list</button></td>
                </tr>
            </tbody>
            </Table>
        ))}
        </Container>
    </>
    )
}
