// import React, { FC } from 'react';
// import { BorrowedBookListWrapper } from './BorrowedBookList.styled';

// interface BorrowedBookListProps {}

// const BorrowedBookList: FC<BorrowedBookListProps> = () => (
//  <BorrowedBookListWrapper data-testid="BorrowedBookList">
//     BorrowedBookList Component
//  </BorrowedBookListWrapper>
// );

// export default BorrowedBookList;

// 2nd Version:-

import React, { useEffect, useState } from 'react';
import { BookService, FeedbackRequest, PageResponseBorrowedBookResponse, BorrowedBookResponse } from '../../../app/services';
import { FeedbackService } from '../../../app/services';
import { Container, Table, Pagination, Button, Form, FormGroup, Label, TextArea, RangeInput } from './BorrowedBookList.styled';  // Assuming you've styled your components

// // Assuming the types from your service response
// interface BorrowedBookResponse {
//   id: number;
//   title: string;
//   authorName: string;
//   isbn: string;
//   rate: number;
//   returned: boolean;
//   returnApproved: boolean;
// }

// interface FeedbackRequest {
//   bookId: number;
//   comment: string;
//   note: number;
// }

// interface PageResponseBorrowedBookResponse {
//   content?: BorrowedBookResponse[];
//   totalPages: number;
// }

const BorrowedBookList = () => {
  const [borrowedBooks, setBorrowedBooks] = useState<PageResponseBorrowedBookResponse>({ totalPages: 0 });
  const [selectedBook, setSelectedBook] = useState<BorrowedBookResponse | undefined>(undefined);
  const [feedbackRequest, setFeedbackRequest] = useState<FeedbackRequest>({ bookId: 0, comment: '', note: 0 });
  const [page, setPage] = useState<number>(0);
  const [pages, setPages] = useState<number[]>([]);

  useEffect(() => {
    findAllBorrowedBooks();
  }, [page]);

  const findAllBorrowedBooks = () => {
    BookService.findAllBorrowedBooks(page, 5)
      .then((resp: PageResponseBorrowedBookResponse) => {
        setBorrowedBooks(resp);
        setPages(Array(resp.totalPages ?? 0).fill(0).map((_, i) => i)); // Fallback to 0 if totalPages is undefined
      })
      .catch((err) => {
        console.error('Error loading borrowed books:', err);
      });
  };

  const returnBorrowedBook = (book: BorrowedBookResponse) => {
    setSelectedBook(book);
    setFeedbackRequest({ ...feedbackRequest, bookId: book.id ?? 0 }); // Default to 0 if book.id is undefined
  };

  const returnBook = (withFeedback: boolean) => {
    if (selectedBook?.id) {
      BookService.returnBorrowedBook(selectedBook.id)
        .then(() => {
          if (withFeedback) {
            giveFeedback();
          }
          setSelectedBook(undefined);
          findAllBorrowedBooks();
        })
        .catch((err) => {
          console.error('Error returning book:', err);
        });
    }
  };

  const giveFeedback = () => {
    FeedbackService.saveFeedback(feedbackRequest)
      .then(() => {
        console.log('Feedback saved');
      })
      .catch((err) => {
        console.error('Error saving feedback:', err);
      });
  };

  const goToPage = (newPage: number) => {
    setPage(newPage);
  };

  const goToFirstPage = () => setPage(0);
  const goToLastPage = () => setPage((borrowedBooks.totalPages ?? 0) - 1);
  const goToPreviousPage = () => setPage(prevPage => Math.max(0, prevPage - 1));
  const goToNextPage = () => setPage(prevPage => Math.min((borrowedBooks.totalPages ?? 0) - 1, prevPage + 1));

  return (
    <Container>
      <h2>My Borrowed Books</h2>

      {/* Form for returning a book with feedback */}
      {selectedBook && (
        <div className="d-flex flex-column col-6">
          <h2>Return and Share Feedback</h2>
          <div className="d-flex flex-column col-12">
            <div className="d-flex">
              <div className="col-1"><strong>Title</strong></div>
              <div className="col-11">{selectedBook.title}</div>
            </div>
            <div className="d-flex">
              <div className="col-1"><strong>Author</strong></div>
              <div className="col-11">{selectedBook.authorName}</div>
            </div>
            <div className="d-flex">
              <div className="col-1"><strong>ISBN</strong></div>
              <div className="col-11">{selectedBook.isbn}</div>
            </div>
            <div className="d-flex">
              <div className="col-1"><strong>Rate</strong></div>
              <div className="col-11">{selectedBook.rate}</div>
            </div>
          </div>

          {/* Feedback Form */}
          <hr />
          <Form>
            <FormGroup>
              <RangeInput
                type="range"
                value={feedbackRequest.note}
                onChange={(e) => setFeedbackRequest({ ...feedbackRequest, note: parseFloat(e.target.value) })}
                min="0"
                max="5"
                step="0.5"
              />
              <span>{feedbackRequest.note}</span>
            </FormGroup>
            <FormGroup>
              <Label htmlFor="feedback">Feedback</Label>
              <TextArea
                id="feedback"
                placeholder="Enter your feedback"
                value={feedbackRequest.comment}
                onChange={(e) => setFeedbackRequest({ ...feedbackRequest, comment: e.target.value })}
              />
            </FormGroup>
            <div className="d-flex justify-content-end gap-2">
              <Button onClick={() => returnBook(true)} className="btn-outline-primary">
                <i className="fas fa-save"></i> Rate & Return
              </Button>
              <Button onClick={() => returnBook(false)} className="btn-outline-success">
                <i className="fa-solid fa-paper-plane"></i> Just Return
              </Button>
              <Button as="a" href="/books/my-books" className="text-danger">
                <i className="fas fa-times"></i> Cancel
              </Button>
            </div>
          </Form>
        </div>
      )}

      {/* Book List */}
      {!selectedBook && (
        <Table>
          <thead>
            <tr>
              <th>#</th>
              <th>Title</th>
              <th>Author</th>
              <th>ISBN</th>
              <th>Rate</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {borrowedBooks.content?.map((book, index) => (
              <tr key={book.id}>
                <td>{index + 1}</td>
                <td>{book.title}</td>
                <td>{book.authorName}</td>
                <td>{book.isbn}</td>
                <td><i className="fas fa-star text-warning"></i> {book.rate}</td>
                <td>
                  <div className="d-flex gap-2">
                    <i className={book.returned ? 'fa-regular fa-paper-plane text-primary' : 'fa-solid fa-paper-plane text-success'} onClick={() => returnBorrowedBook(book as BorrowedBookResponse)}></i>
                    <i className={`fa-solid fa-circle-check ${book.returnApproved ? 'text-success' : ''}`}></i>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </Table>
      )}

      {/* Pagination */}
      <Pagination>
        <Button onClick={goToFirstPage} disabled={page === 0}><i className="fa-solid fa-angles-left"></i></Button>
        <Button onClick={goToPreviousPage} disabled={page === 0}><i className="fa-solid fa-angle-left"></i></Button>
        {pages.map(pageIndex => (
          <Button key={pageIndex} onClick={() => goToPage(pageIndex)} className={page === pageIndex ? 'active' : ''}>
            {pageIndex + 1}
          </Button>
        ))}
        <Button onClick={goToNextPage} disabled={page === (borrowedBooks.totalPages ?? 0) - 1}><i className="fa-solid fa-chevron-right"></i></Button>
        <Button onClick={goToLastPage} disabled={page === (borrowedBooks.totalPages ?? 0) - 1}><i className="fa-solid fa-angles-right"></i></Button>
      </Pagination>
    </Container>
  );
};

export default BorrowedBookList;

