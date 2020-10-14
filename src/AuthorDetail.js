import React, { useEffect } from "react";

// Components
import BookTable from "./BookTable";
import Loading from "./Loading";

import { connect } from "react-redux";
import { useParams } from "react-router-dom";
import { fetchAuthorDetail } from "./redux/actions";
import AddBookModal from "./AddBookModal";

const AuthorDetail = (props) => {
  const authorID = useParams().authorID;
  useEffect(() => {
    props.getAuthor(authorID);
  }, [authorID]);

  if (props.loading) {
    return <Loading />;
  } else {
    const author = props.author;
    const authorName = `${author.first_name} ${author.last_name}`;
    return (
      <div className="author">
        <div>
          <h3>{authorName}</h3>
          <img
            src={author.imageUrl}
            className="img-thumbnail img-fluid"
            alt={authorName}
          />
        </div>
        <BookTable books={props.books.concat(author.books)} />
        <AddBookModal author={author}/>
      </div>
    );
  }
};

const mapStateToProps = (state) => {
  return {
    author: state.authorState.author,
    books: state.authorState.books,
    loading: state.authorState.loading,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    getAuthor: (authorID) => dispatch(fetchAuthorDetail(authorID)),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(AuthorDetail);
