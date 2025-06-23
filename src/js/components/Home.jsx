import React, { useEffect, useState } from "react";


const Home = () => {
	const [nuevaTarea, setNuevaTarea] = useState("");
	const [listaTarea, setListaTarea] = useState([]);

	useEffect(() => {
		getTodos()
	}, [])

     //obtener tareas del usuario
    const getTodos = async () => {
		try {
			const result = await fetch("https://playground.4geeks.com/todo/users/leonardo2")
			const data = await result.json();
			setListaTarea(data.todos);
		} catch (error) {
			console.log("Error al obtener tarea", error);
		}
		
	}

	//crear nueva tarea
	const postTodos = async () => {
		if (nuevaTarea.trim() === "") return;

		try {
			  await fetch("https://playground.4geeks.com/todo/todos/leonardo2",{
				method: "POST",
				headers: {"Content-Type": "application/json"},
				body: JSON.stringify({
				"label": nuevaTarea,
				"is_done": false
				 })
			});
			setNuevaTarea("");
			getTodos();
		} catch (error) {
			console.log("Error en postTodos", error);
		}
	};
			
	
	const deleteTodos = async (id) => {//ELIMINAR TAREA POR su ID
		try {
			await fetch(`https://playground.4geeks.com/todo/todos/${id}`, {
				method: "DELETE",
		});
		getTodos();
		} catch (error) {
			console.log("Error al eliminar taea", error)	
		}		
	};
	
	

	const handleChange = (event) => {
		setNuevaTarea(event.target.value)	
	}
	
		return(
			<div className = "text-center">
				<h1 className="text-center mt-5">Todo List con Fetch
				</h1>
					<div className="container w-50 mx-auto">
						<div className="d-flex gap-2">
							<input type="text"
							className="form-control border-0 border-bottom" 
							value={nuevaTarea}
							onChange={handleChange}
							onKeyDown={(e) => {
							  if (e.key === "Enter"){
								 postTodos ();
							}
                            }}
							placeholder="Agregar tarea"
							style={{ fontSize: "1.2rem" }}
							/>
							
					    </div>
				
						<ul className="list-group mt-3">
						  {listaTarea.map((tarea, index) => (
						    <li 
							  className="list-group-item tarea-item d-flex justify-content-between align-items-center"
						      key={tarea.id}>
								{tarea.label}
								 <button 
									onClick={() => deleteTodos(tarea.id)}
									className="btn btn-sm btn-outline-danger">x</button>
						</li>
						))}
						</ul>
						<div className="d-flex justify-content-between mt-3 border-top pt-2">
							<small className="text muted">
								{listaTarea.length} tareas pendientes 
							</small>
							
						</div>
						</div>
			</div>
		);

	}
	export default Home;