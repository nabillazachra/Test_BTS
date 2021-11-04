import React, {useState, useContext} from 'react'
import { Container,Form } from 'react-bootstrap'
import { useNavigate } from 'react-router';
import { API } from "../config/api";
import { UserContext } from "../context/userContext";


export default function Additem() {
    const [state] = useContext(UserContext);
    const nav = useNavigate()
    const [form, setForm] = useState({
        itemName: "",
        checklistId: "",
      });
      const handleChange = async (e) => {
        setForm({
            ...form,
            [e.target.name]:
              e.target.type === "file" ? e.target.files : e.target.value,
          });
      };

      const handleSubmit = async (e) => {
        try {
          e.preventDefault();
          const config = {
            headers: {
              "Content-type": "application/json",
            },
          };

          let data = {
            itemName: form.itemName,
            checklistId: state.id,
          };
    
          const body = JSON.stringify(data);
    
          const response = await API.post("/item", body, config);
          alert("sukses")
          nav("/check-list")
        } catch (error) {
          console.log(error);
        }
      };
    return (
        <div>
            <Container>
            <Form >
            <Form.Group className="mb-3">
              <Form.Control
                onChange={handleChange}
                name="name"
                value={form.itemName}
                type="text"
                id="name"
                placeholder="item name"
                required
              />
            </Form.Group>
            
            <button onClick={handleSubmit} className="btn-reg auto w-100 mb-3" type="button">
              Submit
            </button>
          </Form>
            </Container>
        </div>
    )
}
