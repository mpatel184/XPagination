import { useEffect, useState } from 'react'
import axios from 'axios'
import './App.css'

function App() {
  const [employee, setEmployee] = useState([])
  const rowPerPage = 10
  const [currentPage, setCurrentPage] = useState(1)
  const fetchdata = async () => {
    try {
      let response = await axios.get('https://geektrust.s3-ap-southeast-1.amazonaws.com/adminui-problem/members.json')
      setEmployee(response.data)
    } catch (error) {
      alert('Failed to fetch data');
      console.log(error)
    }
  }
  useEffect(() => {
    fetchdata()
  }, [])
  
  const totalPages = Math.max(1, Math.ceil(employee.length / rowPerPage));
  const currentEmployees = employee.slice(
    (currentPage - 1) * rowPerPage,
    currentPage * rowPerPage
  );
  return (
    <div style={{ display: "flex", flexDirection: "column", justifyContent: "center", alignItems: "center", marginTop: "50px",width:"100vw" }}>
      <h1 style={{ position: "fixed", top: "0" }}>Employee Data Table</h1>
      <div>
        <table className='table'>
          <thead>
            <tr>
              <th>ID</th>
              <th>Name</th>
              <th>Email</th>
              <th>Role</th>
            </tr>
          </thead>
          <tbody>
            {currentEmployees.map((employee) => (
              <tr key={employee.id}>
                <td>{employee.id}</td>
                <td>{employee.name}</td>
                <td>{employee.email}</td>
                <td>{employee.role}</td>
              </tr>
            ))}
          </tbody>
        </table>
        <div className="pagination">
          <button
            onClick={() => setCurrentPage((prev) => Math.max(prev - 1, 1))}
          >
            Previous
          </button>
          <span>
            {currentPage}
          </span>
          <button
            onClick={() => setCurrentPage((prev) => Math.min(prev + 1, totalPages))}
            disabled={currentPage === totalPages}
          >
            Next
          </button>
        </div>
      </div>
    </div>
  )
}

export default App
