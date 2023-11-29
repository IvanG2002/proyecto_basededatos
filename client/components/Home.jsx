import React, { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";

function Home() {
  const location = useLocation();
  const { username } = location.state || {};
  const [userData, setUserData] = useState(null);
  const [teachers, setTeachers] = useState([]);
  const [groups, setGroups] = useState([]);
  const [students, setStudents] = useState([]);
  const [activeButton, setActiveButton] = useState(null);
  const [showTable, setShowTable] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 5;
  const [searchUsername, setSearchUsername] = useState("");
  const [searchResult, setSearchResult] = useState(null);

  useEffect(() => {
    // Lógica para obtener la información del usuario...
  }, [username]);

  const fetchData = async (url, setData, button) => {
    try {
      const response = await fetch(url);
      const data = await response.json();
      setData(data);
      setActiveButton(button);
      setShowTable(true);
      setCurrentPage(1);
    } catch (error) {
      console.error(`Error fetching all ${button}:`, error);
    }
  };

  const handleViewAllGroups = () => {
    fetchData("http://localhost:3000/groups/all", setGroups, "groups");
  };

  const handleViewAllTeachers = () => {
    fetchData("http://localhost:3000/teachers/all", setTeachers, "teachers");
  };

  const handleSearch = async (event) => {
    event.preventDefault();

    try {
      const response = await fetch("http://localhost:3000/info", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ username: searchUsername }),
      });

      if (!response.ok) {
        throw new Error("Error searching for user");
      }
      const data = await response.json();
      console.log(data);
      setSearchResult(data);
      window.alert(
        `Username: ${data[0].username}\nRole: ${data[0].role}\nFull Name: ${data[0].full_name}\nUser ID: ${data[0].user_id}`
      );
    } catch (error) {
      console.error("Error searching for user:", error);
      setSearchResult(null);
    }
  };

  const handleViewAllStudents = async () => {
    try {
      const response = await fetch("http://localhost:3000/students/all");
      const data = await response.json();
      setStudents(data);
      setActiveButton("students");
      setShowTable(true);
      setCurrentPage(1);
    } catch (error) {
      console.error("Error fetching all students:", error);
    }
  };

  const handleHideTable = () => {
    setShowTable(false);
    setActiveButton(null);
  };

  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;

  let currentItems = [];
  if (activeButton === "students") {
    currentItems = students.slice(indexOfFirstItem, indexOfLastItem);
  } else if (activeButton === "groups") {
    currentItems = groups.slice(indexOfFirstItem, indexOfLastItem);
  } else if (activeButton === "teachers") {
    currentItems = teachers.slice(indexOfFirstItem, indexOfLastItem);
  }

  const renderPageNumbers = () => {
    const totalItems =
      activeButton === "students"
        ? students.length
        : activeButton === "groups"
        ? groups.length
        : teachers.length;

    const pageNumbers = [];
    for (let i = 1; i <= Math.ceil(totalItems / itemsPerPage); i++) {
      pageNumbers.push(
        <span
          key={i}
          className={`join-item btn ${currentPage === i ? "btn-active" : ""}`}
          onClick={() => setCurrentPage(i)}
        >
          {i}
        </span>
      );
    }
    return pageNumbers;
  };

  return (
    <div>
      <div
        style={{ fontWeight: "bold", fontSize: "3rem", marginBottom: "3rem" }}
      >
        {username ? (
          <h2>Welcome, {username}!</h2>
        ) : (
          <h2>No username provided</h2>
        )}
      </div>
      <form
        onSubmit={handleSearch}
        style={{
          marginBottom: "30px",
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <input
          className="input input-bordered"
          style={{ marginRight: "10px" }}
          type="text"
          name="userNameS"
          value={searchUsername}
          onChange={(e) => setSearchUsername(e.target.value)}
        />
        <button className="btn">Search</button>
      </form>
      <div>
        <div style={{ display: "flex", gap: "10px" }}>
          <button className="btn" onClick={handleViewAllStudents}>
            View All Students
          </button>
          <button
            className={`btn ${activeButton === "groups" ? "active" : ""}`}
            onClick={handleViewAllGroups}
          >
            View All Groups
          </button>
          <button
            className={`btn ${activeButton === "teachers" ? "active" : ""}`}
            onClick={handleViewAllTeachers}
          >
            View All Teachers
          </button>
        </div>
        {showTable && (
          <div
            style={{
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              flexDirection: "column",
            }}
          >
            {activeButton === "students" && (
              <div>
                <h3>All Students:</h3>
                <table>
                  <thead>
                    <tr>
                      <th>ID</th>
                      <th>Name</th>
                    </tr>
                  </thead>
                  <tbody>
                    {currentItems.map((student) => (
                      <tr key={student.student_id}>
                        <td>{student.student_id}</td>
                        <td>{student.full_name}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            )}

            {activeButton === "groups" && (
              <div
                style={{
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  flexDirection: "column",
                }}
              >
                <h3>All Groups:</h3>
                <table>
                  <thead>
                    <tr>
                      <th>ID</th>
                      <th>Name</th>
                    </tr>
                  </thead>
                  <tbody>
                    {currentItems.map((group) => (
                      <tr key={group.school_group_id}>
                        <td>{group.school_group_id}</td>
                        <td>{group.group_name}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            )}

            {activeButton === "teachers" && (
              <div
                style={{
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  flexDirection: "column",
                }}
              >
                <h3>All Teachers:</h3>
                <table>
                  <thead>
                    <tr>
                      <th>ID</th>
                      <th>Name</th>
                    </tr>
                  </thead>
                  <tbody>
                    {currentItems.map((teacher) => (
                      <tr key={teacher.teacher_id}>
                        <td>{teacher.teacher_id}</td>
                        <td>{teacher.full_name}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            )}

            <div
              style={{ display: "flex", flexDirection: "column", gap: "10px" }}
            >
              <div className="pagination join">{renderPageNumbers()}</div>
              <button className="btn" onClick={handleHideTable}>
                Hide Table
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

export default Home;
