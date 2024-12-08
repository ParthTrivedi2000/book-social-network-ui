// import styled from 'styled-components';

// // export const MyBooksWrapper = styled.div`
// // `;

// export const Wrapper = styled.div`
//   padding: 2rem;
// `;

// export const NewBookButton = styled.button`
//   display: inline-flex;
//   align-items: center;
//   border: 1px solid #007bff;
//   background-color: transparent;
//   color: #007bff;
//   padding: 0.5rem 1rem;
//   cursor: pointer;
//   font-size: 16px;
//   border-radius: 4px;
//   text-decoration: none;
//   transition: background-color 0.3s ease;

//   &:hover {
//     background-color: #007bff;
//     color: #fff;
//   }
// `;

// export const BooksList = styled.div`
//   display: flex;
//   gap: 1.5rem;
//   flex-wrap: wrap;
// `;

// export const Pagination = styled.nav`
//   display: flex;
//   justify-content: center;
//   margin-top: 1rem;
// `;

// export const PageButton = styled.li<{ disabled?: boolean; active?: boolean }>`
//   list-style: none;
//   margin: 0 5px;

//   a {
//     display: block;
//     padding: 0.5rem 1rem;
//     border-radius: 4px;
//     color: ${(props) => (props.disabled ? '#ccc' : props.active ? '#007bff' : '#000')};
//     text-decoration: none;
//     cursor: ${(props) => (props.disabled ? 'not-allowed' : 'pointer')};
//     background-color: ${(props) => (props.disabled ? '#f5f5f5' : 'transparent')};
//     transition: background-color 0.3s ease;

//     &:hover {
//       background-color: ${(props) => (props.disabled ? '#f5f5f5' : '#f1f1f1')};
//     }
//   }
// `;

// 3rd version:-

import styled from 'styled-components';

export const Button = styled.button`
  padding: 0.375rem 0.75rem;
  font-size: 1rem;
  border: 1px solid #007bff;
  color: #007bff;
  background-color: transparent;
  border-radius: 0.25rem;
  cursor: pointer;

  &:hover {
    background-color: #007bff;
    color: white;
  }
`;

export const Pagination = styled.ul`
  display: flex;
  list-style: none;
  padding: 0;
  margin: 0;
`;

export const PaginationItem = styled.li`
  margin: 0 2px;
`;

export const PaginationLink = styled.a<{ active?: boolean; disabled?: boolean }>`
  display: block;
  padding: 0.5rem 0.75rem;
  color: ${({ active }) => (active ? '#fff' : '#007bff')};
  background-color: ${({ active }) => (active ? '#007bff' : 'transparent')};
  border: 1px solid #007bff;
  cursor: ${({ disabled }) => (disabled ? 'not-allowed' : 'pointer')};
  pointer-events: ${({ disabled }) => (disabled ? 'none' : 'auto')};

  &:hover {
    background-color: ${({ disabled }) => (disabled ? 'transparent' : '#007bff')};
    color: ${({ disabled }) => (disabled ? '#007bff' : '#fff')};
  }
`;