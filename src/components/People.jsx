import PropTypes from "prop-types";
import { Person } from "./Person";
import { useState } from "react";

export const People = ({ people, setPeople }) => {

  const [editingId, setEditingId] = useState(null);

  const [isEditing, setIsEditing] = useState(false);

  const [editedPerson, setEditedPerson] = useState(
    {
      name: '',
      role: '',
      img: ''
    }
  );

  const [personToDelete, setPersonToDelete] = useState(null);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setEditedPerson(prevState => ({
      ...prevState,
      [name]: value
    }));
  };

  const handleCreate = (e) => {
    e.preventDefault();

    setPeople([...people, { id: people.length + 1, ...editedPerson }]);

    setEditedPerson({ name: '', role: '', img: '' });
  };

  const handleEdit = (id) => {

    setEditingId(id);
    setIsEditing(true);
    const personToEdit = people.find(person => person.id === id);

    setEditedPerson({ ...personToEdit });
  };

  const handleSave = (e) => {

    e.preventDefault();

    const updatePeople = people.map(person => person.id === editingId ? editedPerson : person);

    setPeople(updatePeople);

    setIsEditing(false);

    setEditingId(null);

    setEditedPerson({
      name: '',
      role: '',
      img: ''
    });
  }

  // Métodos para eliminar una persona del array

  const handleDelete = (id) => {
    setPersonToDelete(id);
  };

  const confirmDelete = () => {

    setPeople(people.filter(person => person.id !== personToDelete));

    setPersonToDelete(null);
  };

  const cancelDelete = () => {
    setPersonToDelete(null);
  };


  return (
    <div>
      <h2 className='text-center my-4'>IT Team</h2>
      <div className='container'>
        <div className='row d-flex flex-wrap row-cols-1 row-cols-md-2 row-cols-lg-3'>
          {
            people.map((people) => {
              return (
                <div key={people.id}>
                  <Person
                    id={people.id}
                    name={people.name}
                    img={people.img}
                    role={people.role}
                    handleEdit={() => handleEdit(people.id)}
                    handleDelete={() => handleDelete(people.id)}
                  />
                </div>
              );
            })
          }
        </div>
      </div>
      {/* Formulario */}
      <div className='container'>
        <h2 className='text-center mt-4' > {isEditing ? 'Actualizar Empleado' : 'Crear Nuevo Empleado'} </h2>
        <form>
          <div>
            <label htmlFor="name">Nombres</label>
            <input type="text" name="name" value={editedPerson.name} onChange={handleChange} required className="form-control" />
          </div>
          <div>
            <label htmlFor="role">Rol</label>
            <input type="text" name="role" value={editedPerson.role} onChange={handleChange} required className="form-control" />
          </div>
          <div>
            <label htmlFor="img">Avatar</label>
            <input type="text" name="img" value={editedPerson.img} onChange={handleChange} required className="form-control" />
          </div>
          <div className="mt-2 text-center">
            <button type="submit" className="btn btn-primary" onClick={isEditing ? handleSave : handleCreate}> {isEditing ? 'Actualizar' : 'Crear'} </button>
          </div>
        </form>
      </div>
      {/* Modal de confirmación  para eliminar */}
      <div id="deleteModal" className="modal fade" tabIndex="-1" >
        <div className="modal-dialog">
          <div className="modal-content">
            <div className="modal-header">
              <h4 className="modal-title">Confirmar Eliminación</h4>
              <button type="button" className="btn-close" data-bs-dismiss="modal" onClick={cancelDelete}></button>
            </div>
            <div className="modal-body">
              <p>¿Estás seguro de eliminar a {people.find(person => person.id === personToDelete)?.name} ?</p>
            </div>
            <div className="modal-footer">
              <button type="button" className="btn btn-secondary" data-bs-dismiss="modal" onClick={cancelDelete}>Cancelar</button>
              <button type="button" className="btn btn-danger" data-bs-dismiss="modal" onClick={confirmDelete}>Eliminar</button>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
};

People.propTypes = {
  people: PropTypes.array,
  setPeople: PropTypes.func
}