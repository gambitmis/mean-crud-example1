import Axios from 'axios'
import { useState } from 'react'

function App() {

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [position, setPosition] = useState("");
  const [salary, setSalary] = useState(0);
  const [newSalary, setNewSalary] = useState(0);
  const [employeeList, setEmployeeList] = useState([]);

  const getEmployee = () => {
    Axios.get('http://mern.tuxtum.net:30080/emp').then((response) => {
      setEmployeeList(response.data);
    });
  }

  const addEmployee = () => {
    Axios.post('http://mern.tuxtum.net:30080/create',{
      name: name,
      email: email,
      position: position,
      salary: salary
    }).then(() => {
      setEmployeeList([
        ...employeeList,
        {
          name: name,
          email: email,
          position: position,
          salary: salary
        }
      ])
    })
  }

  const updateSalary = (id) =>{
    Axios.put('http://mern.tuxtum.net:30080/update', { salary: newSalary, id: id }).then((response) =>{
      setEmployeeList(
        employeeList.map((val) => {
          return val.id == id ? {
            id: val.id,
            name: val.name,
            email: val.email,
            position: val.position,
            salary: newSalary
          } : val;
        })
      )
    })
  }

  const deleteEmp = (id) => {
    Axios.delete(`http://mern.tuxtum.net:30080/delete/${id}`).then((response) => {
      setEmployeeList(
        employeeList.filter((val) => {
          return val.id != id;
        })
      )
    })
  }

  return (
    <div className="App container">
      <h1>Employee Infomation</h1>
      <div className="information">
        <form action="">
          <div className="mb-3">
            <label htmlfor="name" className="form-label">Name</label>
            <input 
              type="text" 
              className="form-control" 
              placeholder="John Doe"
              onChange={(event) => {
                setName(event.target.value)
              }} 
            />
          </div>
          <div className="mb-3">
            <label htmlfor="email" className="form-label">Email address</label>
            <input 
              type="email" 
              className="form-control" 
              placeholder="john@example.com"
              onChange={(event) => {
                setEmail(event.target.value)
              }} 
            />
          </div>
          <div className="mb-3">
            <label htmlfor="position" className="form-label">Position</label>
            <input 
              type="text" 
              className="form-control" 
              placeholder="System Engineer"
              onChange={(event) => {
                setPosition(event.target.value)
              }} 
            />
          </div>
          <div className="mb-3">
            <label htmlfor="salary" className="form-label">Salary</label>
            <input 
              type="text" 
              className="form-control" 
              placeholder="20000"
              onChange={(event) => {
                setSalary(event.target.value)
              }} 
            />
          </div>
          <button className="btn btn-success" onClick={addEmployee}>Add Employee</button>
        </form>
      </div>
      <hr />
      <div className="employee">
        <button className="btn btn-primary" onClick={getEmployee}>Show Employee</button>
        {employeeList.map((val, key) => {
          return (
            <div className="employee card mt-4">
                <div className="card-body text-left">
                  <p className="card-text">Name: {val.name}</p>
                  <p className="card-text">Email: {val.email}</p>
                  <p className="card-text">Position: {val.position}</p>
                  <p className="card-text">Salary: {val.salary}</p>
                  <div className="d-flex">
                    <input 
                      type="text"
                      style={{width:"300px"}}
                      placeholder="xx,xxx ฿"
                      className="form-control"
                      onChange={(event) => {
                        setNewSalary(event.target.value)
                      }}
                    />
                    <button className="btn btn-warning" onClick={() => { updateSalary(val.id)}}>Update</button>
                    <button className="btn btn-danger" onClick={() => { deleteEmp(val.id)}}>Delete</button>
                  </div>
                </div>
            </div>
          )
        })}
      </div>
    </div>
  );
}

export default App;
