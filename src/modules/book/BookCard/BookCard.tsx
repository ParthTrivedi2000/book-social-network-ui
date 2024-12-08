// import React, { FC } from 'react';
// import { BookCardWrapper } from './BookCard.styled';

// interface BookCardProps {}

// const BookCard: FC<BookCardProps> = () => (
//  <BookCardWrapper data-testid="BookCard">
//     BookCard Component
//  </BookCardWrapper>
// );

// export default BookCard;

// 2nd version

import React from 'react';
import { BookResponse } from '../../../app/services';
import Rating from '../Rating/Rating'; // Assuming you have a Rating component
import { Card, CardBody, CardFooter, CardTitle, CardSubtitle, CardText, Icon, CardImage, ButtonGroup } from '../BookCard/BookCard.styled';

interface BookCardProps {
  book: BookResponse;
  manage: boolean;
  onShare: (book: BookResponse) => void;
  onArchive: (book: BookResponse) => void;
  onAddToWaitingList: (book: BookResponse) => void;
  onBorrow: (book: BookResponse) => void;
  onEdit: (book: BookResponse) => void;
  onShowDetails: (book: BookResponse) => void;

//   onShare = () => {}; // Default to no-op function
//   onArchive = () => {};
//   onAddToWaitingList = () => {};
//   onBorrow = () => {};
//   onEdit = () => {};
//   onShowDetails = () => {}
}

const BookCard: React.FC<BookCardProps> = ({
//   book,
//   manage,
//   onShare,
//   onArchive,
//   onAddToWaitingList,
//   onBorrow,
//   onEdit,
//   onShowDetails,

  book,
  manage,
  onShare = () => {}, // Default to no-op function
  onArchive = () => {},
  onAddToWaitingList = () => {},
  onBorrow = () => {},
  onEdit = () => {},
  onShowDetails = () => {},
}) => {
  const bookCover = book.cover ? `data:image/jpg;base64,${book.cover}` : 'https://source.unsplash.com/user/c_v_r/1900x800';

  return (
    <Card className={book.shareable ? 'border-success' : book.archived ? 'border-warning' : ''}>
      <CardImage src={bookCover} alt="Book Cover" height="200" />
      <CardBody>
        <CardTitle>
          <i className="fa-solid fa-book"></i>&nbsp;{book.title}
        </CardTitle>
        <CardSubtitle>
          <i className="fa-solid fa-user-check"></i>&nbsp;{book.authorName}
        </CardSubtitle>
        <CardSubtitle>
          <i className="fas fa-code"></i>&nbsp;{book.isbn}
        </CardSubtitle>
        <CardSubtitle>
          <i className="fas fa-user"></i>&nbsp;{book.owner}
        </CardSubtitle>
        <hr />
        <CardText>{book.synopsis}</CardText>
      </CardBody>
      <CardFooter>
        <ButtonGroup>
          <Rating rating={book.rate || 0} onRatingClick={()=>{}} />
          {book.rate && <span className="fw-bold">{book.rate}</span>}
        </ButtonGroup>
        <ButtonGroup>
          {!manage && (
            <>
              <Icon onClick={() => onShowDetails(book)} className="fas fa-circle-info text-primary" />
              <Icon onClick={() => onBorrow(book)} className="fas fa-list-check text-primary" />
              <Icon onClick={() => onAddToWaitingList(book)} className="fas fa-heart text-danger" />
            </>
          )}
          {manage && (
            <>
              <Icon onClick={() => onEdit(book)} className="fas fa-edit text-success" />
              <Icon onClick={() => onShare(book)} className="fas fa-share-nodes text-primary" />
              <Icon onClick={() => onArchive(book)} className="fas fa-archive text-danger" />
            </>
          )}
        </ButtonGroup>
      </CardFooter>
    </Card>
  );
};

export default BookCard;
