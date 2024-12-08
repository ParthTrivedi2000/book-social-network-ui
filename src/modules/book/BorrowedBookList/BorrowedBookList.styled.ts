// import styled from 'styled-components';

// export const BorrowedBookListWrapper = styled.div`
// `;

import styled from 'styled-components';

export const Container = styled.div`
  padding: 20px;
  max-width: 800px;
  margin: 0 auto;
`;

export const Table = styled.table`
  width: 100%;
  border-collapse: collapse;
  margin-top: 20px;

  th, td {
    padding: 12px;
    text-align: left;
  }

  th {
    background-color: #f8f9fa;
  }

  td {
    border-top: 1px solid #ddd;
  }
`;

export const Pagination = styled.div`
  display: flex;
  justify-content: center;
  margin-top: 20px;
`;

export const Button = styled.button`
  background-color: transparent;
  border: 1px solid #ccc;
  padding: 8px 16px;
  cursor: pointer;

  &:disabled {
    cursor: not-allowed;
    opacity: 0.5;
  }

  &.active {
    background-color: #007bff;
    color: white;
  }
`;

export const Form = styled.form`
  margin-top: 20px;
`;

export const FormGroup = styled.div`
  margin-bottom: 10px;
`;

export const Label = styled.label`
  display: block;
  font-weight: bold;
`;

export const TextArea = styled.textarea`
  width: 100%;
  padding: 10px;
  border: 1px solid #ccc;
  border-radius: 4px;
`;

export const RangeInput = styled.input`
  width: 50%;
  margin-right: 10px;
`;
