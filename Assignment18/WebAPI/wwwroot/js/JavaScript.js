document.addEventListener("DOMContentLoaded", () => {
    const taskList = document.getElementById("taskList");
    const createTaskFrom = document.getElementById("createTaskFrom");
    const updateTaskFrom = document.getElementById("updateTaskFrom");
    const deleteTaskFrom = document.getElementById("deleteTaskFrom");

    function displayTask() {
        fetch("http://localhost:5247/api/tasks")
            .then(response => {
                if (!response.ok) {
                    throw new Error(`HTTP error! Status :${response.status}`);
                }
                return response.json();
            })
            .then(tasks => {
                taskList.innerHTML = "";
                tasks.forEach(task => {
                    const listitem = document.createElement("li");
                    listitem.textContent = `ID:${task.id},Title:${task.title},Description :${task.description},DueDate :${task.dueDate}`;
                    taskList.appendChild(listitem);
                });
            })
            .catch(error => {
                console.error("Fetch Error :", error);
                taskList.innerHTML = "Error Fetching tasks."
            });
    }

    createTaskFrom.addEventListener("submit", (e) => {
        e.preventDefault();
        const title = document.getElementById("title").value;
        const description = document.getElementById("description").value;
        const dueDate = document.getElementById("dueDate").value;

        fetch(`http://localhost:5247/api/tasks`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({ title, description, dueDate })
        })
            .then(response => {
                if (!response.ok) {
                    throw new Error(`HTTP error! Status :${response.status}`);
                }
                return response.json();
            })
            .then(() => {
                //clear fields after successfull creation
                document.getElementById("title").value = "";
                document.getElementById("description").value = "";
                document.getElementById("dueDate").value = "";
                //refresh the tasklist
                displayTask();
            })
            .catch(error => {
                console.error("Fetch Error :", error);
            });
    });
    updateTaskFrom.addEventListener("submit", (e) => {
        e.preventDefault();
        const taskId = document.getElementById("taskId").value;
        const newTitle = document.getElementById("newTitle").value;
        const newDescription = document.getElementById("newDescription").value;
        const newDueDate = document.getElementById("newDueDate").value;

        fetch(`http://localhost:5247/api/tasks/${taskId}`, {
            method: "PUT",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({ id: taskId, title: newTitle, description: newDescription, dueDate: newDueDate })
        })
            .then(response => {
                if (!response.ok) {
                    throw new Error(`HTTP error! Status :${response.status}`);
                }
                return response.json();
            })
            .then(() => {
                document.getElementById("taskId").value = "";
                document.getElementById("newTitle").value = "";
                document.getElementById("newDescription").value = "";
                document.getElementById("newDueDate").value = "";
                displayTask();
            })
            .catch(error => {
                console.error("Fetch Error :", error);
            });
    });
    //Event Listener for Delete Task Form Submission
    deleteTaskFrom.addEventListener("submit", (e) => {
        e.preventDefault();
        const deletetaskId = document.getElementById("deletetaskId").value;

        fetch(`http://localhost:5247/api/tasks/${deletetaskId}`, {
            method: "DELETE"
        })
            .then(response => {
                if (!response.ok) {
                    throw new Error(`HTTP error! Status :${response.status}`);
                }
                return response.json();
            })
            .then(() => {
                document.getElementById("deletetaskId").value = "";
                displayTask();
            })
            .catch(error => {
                console.error("Fetch Error :", error);
            });
    });

    displayTask();

});