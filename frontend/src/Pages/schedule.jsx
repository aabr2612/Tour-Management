import React, { useState, useEffect, useContext } from "react";
import CommonSection from "../Shared/CommonSection";
import Newsletter from "../Shared/Newsletter";
import { Container, Row, Col, Button, Form, FormGroup, Label, Input } from "reactstrap";
import axios from "axios";
import "../styles/TaskPage.css"; // Ensure this path is correct
import { AuthContext } from "../context/AuthContext"; // Adjust the path if needed

const TasksPage = () => {
  const [tasks, setTasks] = useState([]);
  const [newTask, setNewTask] = useState({ title: "", date: "" });
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [isFormVisible, setIsFormVisible] = useState(false);

  const { user } = useContext(AuthContext); // Get user from context
  const userId = user?.username; // Extract user ID from context

  const baseUrl = process.env.REACT_APP_BASE_URL; // Get base URL from env

  // Fetch tasks from API
  useEffect(() => {
    const fetchTasks = async () => {
      try {
        const response = await axios.get(`${baseUrl}/schedule/${userId}`); // Use base URL
        setTasks(response.data);
        setLoading(false);
      } catch (error) {
        setLoading(false);
        setError("Error loading tasks.");
      }
    };

    fetchTasks();
  }, [baseUrl, userId]);

  // Handle adding a new task
  const handleAddTask = async () => {
    if (newTask.title && newTask.date) {
      try {
        const taskToAdd = { ...newTask, userId }; // Include userId in the new task
        await axios.post(`${baseUrl}/schedule/`, taskToAdd); // Use base URL
        setTasks([...tasks, taskToAdd]); // Add new task to the list
        setNewTask({ title: "", date: "" }); // Clear form fields
        setIsFormVisible(false); // Hide the form after saving
      } catch (error) {
        console.error("Failed to add task", error);
        setError("Failed to add task.");
      }
    } else {
      setError("Please enter both title and date.");
    }
  };

  // Handle deleting a task
  const handleDeleteTask = async (taskId) => {
    try {
      await axios.delete(`${baseUrl}/schedule/${taskId}`); // Delete task from the server
      setTasks(tasks.filter((task) => task._id !== taskId)); // Remove task from state
    } catch (error) {
      console.error("Failed to delete task", error);
      setError("Failed to delete task.");
    }
  };

  // Handle input change
  const handleChange = (e) => {
    const { name, value } = e.target;
    setNewTask({ ...newTask, [name]: value });
  };

  // Sort tasks by date
  const sortedTasks = tasks.sort((a, b) => new Date(a.date) - new Date(b.date));

  if (loading) {
    return (
      <div className="loader-container">
        <div className="loader" />
        <div className="loading-text">Loading...</div>
      </div>
    );
  }

  if (error) {
    return <div className="error__msg">{error}</div>;
  }

  return (
    <div>
      <CommonSection title={"Schedule"} />
      <section>
        <Container>
          <Button
            color="primary"
            onClick={() => setIsFormVisible(!isFormVisible)}
            className="mb-4"
          >
            {isFormVisible ? "Cancel" : "Add New Task"}
          </Button>
          <div className={`task-form-container ${isFormVisible ? "open" : ""}`}>
            <Form className="task-form">
              <FormGroup>
                <Label for="title">Title</Label>
                <Input
                  type="text"
                  id="title"
                  name="title"
                  value={newTask.title}
                  onChange={handleChange}
                />
              </FormGroup>
              <FormGroup>
                <Label for="date">Date</Label>
                <Input
                  type="date"
                  id="date"
                  name="date"
                  value={newTask.date}
                  onChange={handleChange}
                />
              </FormGroup>
              <Button color="primary" onClick={handleAddTask}>
                Save
              </Button>
            </Form>
          </div>
        </Container>
      </section>
      <section>
        <Container>
          <Row>
            {sortedTasks.map((task, index) => (
              <Col lg="4" md="6" sm="12" className="mb-4" key={index}>
                <div className="task-card">
                  <div className="task-card-header">
                    <h5>{task.title}</h5>
                    <Button
                      color="danger"
                      size="sm"
                      onClick={() => handleDeleteTask(task._id)}
                    >
                      Delete
                    </Button>
                  </div>
                  <p>{new Date(task.date).toLocaleDateString()}</p>
                </div>
              </Col>
            ))}
          </Row>
        </Container>
      </section>
      <Newsletter />
    </div>
  );
};

export default TasksPage;
