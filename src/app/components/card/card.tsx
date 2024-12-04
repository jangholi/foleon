import React, { useState } from "react";
import CardOverlay from "../cardOverlay/cardOverlay";
import { APIPublication } from "../../api/publication";
import styled from "styled-components";

const Card = styled.div`
  border-radius: 2px;
  overflow: hidden;
  font-family: Arial, sans-serif;
  background-color: #fff;

  &:focus-within {
    outline: 2px solid #007bff;
  }
`;

const ImageWrapper = styled.div`
  width: 100%;
  height: 180px;
  overflow: hidden;

  img {
    width: 100%;
    height: 100%;
    object-fit: cover;
    display: block;
  }
`;

const Content = styled.div`
  padding: 16px;
`;

const Title = styled.h3`
  font-size: 1.2rem;
  margin: 0 0 8px;
  color: #333;
`;

const CreateTime = styled.p`
  font-size: 0.9rem;
  color: var(--color-dark-gray);
  margin: 0;
`;

const MoreInfo = styled.button`
  font-size: 0.9rem;
  color: var(--color-primary);
  margin-top: 20px;
  background-color: transparent;
  border: 1px solid var(--color-primary);
  padding: 7px 20px;
  cursor: pointer;

  &:hover {
    background: var(--color-primary);
    color: white;
  }
`;

interface PublicationCardProps {
  publication: APIPublication;
}

const PublicationCard: React.FC<PublicationCardProps> = ({ publication }) => {
  const [overlayVisibility, setOverlayVisibility] = useState<boolean>(false);

  return (
    <Card role="article" aria-labelledby={`card-title-${publication.name}`}>
      <CardOverlay
        isVisible={overlayVisibility}
        onCloseCardOverlay={() => setOverlayVisibility(false)}
        publication={publication}
      />
      <ImageWrapper>
        <img
          src={publication._embedded?.screenshot?._links?.desktop?.href}
          alt={`Cover image for ${publication.name}`}
        />
      </ImageWrapper>
      <Content>
        <Title id={`card-title-${publication.name}`}>{publication.name}</Title>
        <CreateTime>Created at: {publication.created_on}</CreateTime>
        <MoreInfo onClick={() => setOverlayVisibility(true)}>
          More info
        </MoreInfo>
      </Content>
    </Card>
  );
};

export default PublicationCard;
