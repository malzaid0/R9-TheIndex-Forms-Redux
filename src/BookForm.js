import React, {useState, useEffect} from "react";
import {postBook, resetErrors} from "./redux/actions";
import {connect} from "react-redux";

const BookForm = (props) => {
  const [book, setBook] = useState({
    title: "",
    color: "",
    authors: [props.author.id]
  });
  useEffect(() => {
    return () => {
      if (props.errors.length) props.resetErrors();
    };
  }, []); // Component Will unmount

  const textChangeHandler = event => {
    setBook({...book, [event.target.name]: event.target.value})
  }

  const submitBook = (event) => {
    event.preventDefault();
    props.postBook(book, props.closeModal);
  };

  const errors = props.errors;
  return (
      <div className="mt-5 p-2">
        <form onSubmit={submitBook}>
          {!!errors.length && (
              <div className="alert alert-danger" role="alert">
                {errors.map((error) => (
                    <p key={error}>{error}</p>
                ))}
              </div>
          )}
          <div className="input-group mb-3">
            <div className="input-group-prepend">
              <span className="input-group-text">Title</span>
            </div>
            <input type="text" className="form-control" name="title" value={book.title} onChange={textChangeHandler} />
          </div>
          <div className="input-group mb-3">
            <div className="input-group-prepend">
              <span className="input-group-text">Color</span>
            </div>
            <input type="text" className="form-control" name="color" value={book.color} onChange={textChangeHandler} />
          </div>
          <input type="submit" />
        </form>
      </div>
  )
};
const mapStateToProps = (state) => {
  return {
    errors: state.errorsState.errors,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    postBook: (newBook, closeModal) =>
        dispatch(postBook(newBook, closeModal)),
    resetErrors: () => dispatch(resetErrors()),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(BookForm);
