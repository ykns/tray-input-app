import { ButtonContainer } from 'components/button';
import React, { useState } from 'react';

export interface AsyncButtonProps {
  onClick: (event: React.SyntheticEvent) => Promise<void>;
}

export const AsyncButton = (props: AsyncButtonProps) => {
  const { onClick, ...rest } = props;
  const [isBusy, setIsBusy] = useState(false);

  return <ButtonContainer {...(isBusy && { disabled: true })} onClick={async (event: React.SyntheticEvent) => {
    try {
      setIsBusy(true);
      await onClick(event);
    } finally {
      setIsBusy(false);
    }
  }} {...rest}></ButtonContainer>
}