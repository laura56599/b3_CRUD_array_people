import PropTypes from "prop-types";

export const Person = ({ name, role, img, handleEdit, handleDelete }) => {
  return (
    <div className='col'>
      <div className="card mb-4" style={{width: "18rem"}}>
        <img src={img} className="card-img-top" alt={name} />
          <div className="card-body">
            <h3 className="card-title">{name}</h3>
            <p className="card-text">{role}</p>
          </div>
          <div className='container mb-4'>
            <button className="btn btn-primary mx-2" onClick={handleEdit}>Editar</button>
            <button className="btn btn-danger" onClick={handleDelete} data-bs-toggle="modal" data-bs-target="#deleteModal" >Eliminar</button>
          </div>
      </div>
    </div>
  )
};

Person.propTypes = {
  name: PropTypes.string,
  role: PropTypes.string,
  img: PropTypes.string,
  handleEdit: PropTypes.func,
  handleDelete: PropTypes.func
}