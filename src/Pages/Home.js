import React from 'react';
import { Link } from '@reach/router';
import styled from 'styled-components';

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

const Title = styled.h1`
  display: flex;
  justify-content: center;
`;

const ProjectLink = styled(Link)`
  text-decoration: none;
`;

export default function App() {
  return (
    <Container>
      <Content>
        <ProjectLink to="realtime-data-chart">
          <Title>Realtime Data Chart</Title>
        </ProjectLink>
      </Content>
    </Container>
  );
}
