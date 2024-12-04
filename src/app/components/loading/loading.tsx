import React from "react";
import styled, { keyframes } from "styled-components";

const Container = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
`;

const spin = keyframes`
  0% { transform: rotate(0deg); }
  100% { transform: rotate(360deg); }
`;

const Spinner = styled.div`
  width: 50px;
  height: 50px;
  border-radius: 50%;
  border: 6px solid #ccc;
  border-top: 6px solid var(--color-primary);
  animation: ${spin} 1s linear infinite;
`;

const Message = styled.p`
  margin-top: 16px;
  font-size: 18px;
  color: var(--color-primary);
  font-weight: bold;
`;

type LoadingProps = {
  message?: string;
};

const Loading: React.FC<LoadingProps> = ({ message = "Loading..." }) => {
  return (
    <Container>
      <Spinner />
      <Message>{message}</Message>
    </Container>
  );
};

export default Loading;
