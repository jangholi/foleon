import React from "react";
import Overlay from "../overlay/overlay";
import styled from "styled-components";
import type { APIPublication } from "../../api/publication";

const CardContainer = styled.div`
  display: flex;
  flex-direction: column;
  gap: 10px;
`;

const CardHeading = styled.h2`
  margin: 0;
  font-size: 1.5rem;
  border-bottom: 2px solid var(--color-divider);
  padding-bottom: 20px;
`;

const CardDetail = styled.p`
  font-size: 1rem;
  color: var(--color-dark-gray);
  margin: 5px 0;

  span {
    font-weight: bold;
    color: black;
  }
`;

const Button = styled.button`
  padding: 10px 20px;
  font-size: 1rem;
  color: var(--color-primary);
  background: transparent;
  border: 1px solid var(--color-primary);
  border-radius: 8px;
  cursor: pointer;

  &:hover {
    background: var(--color-primary);
    color: white;
  }
`;

interface CardOverlayProps {
  isVisible: boolean;
  onCloseCardOverlay: () => void;
  publication: APIPublication;
}

const CardOverlay: React.FC<CardOverlayProps> = ({
  publication,
  onCloseCardOverlay,
  isVisible,
}) => {
  const publishedLink = publication._links?.published?.href;
  if (!isVisible) {
    return;
  }
  return (
    <Overlay isVisible={isVisible} onCloseOverlay={() => onCloseCardOverlay()}>
      <CardContainer>
        <CardHeading>{publication.name}</CardHeading>
        <img
          src={publication._embedded?.screenshot?._links?.desktop?.href}
          alt={`Cover image for ${publication.name}`}
        />
        <CardDetail>
          <span>Category:</span> {publication.category?.replace(/_/g, " ")}
        </CardDetail>
        <CardDetail>
          <span>Created On:</span> {publication.created_on}
        </CardDetail>
        <CardDetail>
          <span>Modified On:</span> {publication.modified_on}
        </CardDetail>
        {publishedLink && (
          <Button>
            <a href={publishedLink} target="_blank" role="noopener">
              Published Link
            </a>
          </Button>
        )}
        <Button onClick={() => onCloseCardOverlay()}>Close</Button>
      </CardContainer>
    </Overlay>
  );
};

export default CardOverlay;
