import React from 'react';
import styled from 'styled-components';
import SalesDataChart from '../Components/SalesDataChart';

const Container = styled.div`
  display: flex;
  height: 100vh;
  width: 100wh;
  align-items: center;
`;

const Content = styled.div`
  display: flex;
  height: 60vh;
  width: 100%;
  flex-direction: column;
`;

const Title = styled.h3`
  display: flex;
  justify-content: center;
`;

export default function App() {
  return (
    <Container>
      <Content>
        <Title>
          This is a real time data chart, it's using real time data generated
          from a socket server
        </Title>
        <SalesDataChart />
      </Content>
    </Container>
  );
}
