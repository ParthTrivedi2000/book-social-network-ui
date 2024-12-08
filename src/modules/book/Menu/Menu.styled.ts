// import styled from 'styled-components';

// export const MenuWrapper = styled.div`
// `;

import styled from 'styled-components';
import { Link } from 'react-router-dom';

export const Navbar = styled.nav`
  background-color: #f8f9fa;
  .container-fluid {
    display: flex;
    justify-content: space-between;
    align-items: center;
  }

  .navbar-toggler {
    background-color: #000;
  }

  .navbar-brand {
    font-weight: bold;
  }

  .navbar-collapse {
    display: flex;
    justify-content: space-between;
    width: 100%;
  }
`;

export const Nav = styled.ul`
  list-style: none;
  display: flex;
  gap: 20px;
`;

export const NavItem = styled.li``;

export const NavLink = styled(Link)`
  color: #000;
  text-decoration: none;
  padding: 10px;
  border-radius: 5px;

  &:hover {
    background-color: #d6e5f1;
    text-decoration: underline;
  }

  &.active {
    color: #24a7e9;
    border-radius: 5px;
  }
`;

export const SearchForm = styled.form`
  display: flex;
  align-items: center;

  input {
    margin-right: 10px;
  }

  button {
    background-color: transparent;
    border: none;
    cursor: pointer;
  }
`;

