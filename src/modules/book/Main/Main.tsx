// import React, { FC } from 'react';
// import { MainWrapper } from './Main.styled';

// interface MainProps {}

// const Main: FC<MainProps> = () => (
//  <MainWrapper data-testid="Main">
//     Main Component
//  </MainWrapper>
// );

// export default Main;


// 2nd version:-

import React from 'react';
import { Outlet } from 'react-router-dom'; // This is equivalent to `router-outlet` in Angular
import Menu from '../Menu/Menu'; // Assuming you have already created the Menu component
import { MainWrapper, ContentWrapper } from './Main.styled';

const Main: React.FC = () => {
  return (
    <MainWrapper>
      <Menu />
      <ContentWrapper>
        <Outlet /> {/* React Router's equivalent to Angular's router-outlet */}
      </ContentWrapper>
    </MainWrapper>
  );
};

export default Main;
