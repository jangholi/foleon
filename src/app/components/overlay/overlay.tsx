import React, { Fragment } from "react";
import styled from "styled-components";

const OverlayContainer = styled.div<{ isVisible: boolean }>`
  display: ${(props) => (props.isVisible ? "flex" : "none")};
  position: fixed;
  top: 0;
  left: 0;
  cursor: pointer;
  width: 100%;
  height: 100%;
  background: rgba(0, 0, 0, 0.6);
  justify-content: center;
  align-items: center;
  z-index: 1000;
`;

const OverlayContent = styled.div`
  background: white;
  padding: 20px;
  border-radius: 8px;
  box-shadow: 0px 4px 6px rgba(0, 0, 0, 0.1);
  text-align: center;
  width: 100%;
  max-width: 400px;
  max-height: 100%;
  overflow-x: scroll;
  cursor: default;
`;

interface OverlayProps {
  isVisible: boolean;
  children?: React.ReactNode;
  onCloseOverlay: () => void;
}

const Overlay: React.FC<OverlayProps> = ({
  children,
  isVisible,
  onCloseOverlay,
}) => {
  const handleContainerClick = () => {
    onCloseOverlay();
  };

  if (!isVisible) {
    return;
  }

  return (
    <OverlayContainer
      isVisible={isVisible}
      role="dialog"
      aria-modal="true"
      aria-hidden={!isVisible}
      onClick={handleContainerClick}
    >
      <OverlayContent onClick={(e) => e.stopPropagation()}>
        {children}
      </OverlayContent>
    </OverlayContainer>
  );
};

export default Overlay;
