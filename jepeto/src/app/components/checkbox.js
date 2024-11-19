//jepeto\components\checkbox.js
import styled from 'styled-components';

const CheckboxContainer = styled.div`
  display: flex;
  align-items: center;
`;

const HiddenCheckbox = styled.input.attrs({ type: 'checkbox' })`
  position: absolute;
  opacity: 0;
  cursor: pointer;
  height: 0;
  width: 0;
`;

const StyledCheckbox = styled.div`
  display: inline-flex;
  align-items: center;
  justify-content: center;
  width: 15px;
  height: 15px;
  background: ${props => props.$checked ? '#1E88E5' : '#f0f0f0'};
  border-radius: 4px;
  transition: all 0.2s;
  cursor: pointer;

  ${HiddenCheckbox}:focus + & {
    box-shadow: 0 0 0 2px rgba(30, 136, 229, 0.2);
  }

  &:hover {
    background: ${props => props.$checked ? '#1976D2' : '#e0e0e0'};
  }
`;

const CheckIcon = styled.svg`
  fill: none;
  stroke: white;
  stroke-width: 3px;
  visibility: ${props => props.$checked ? 'visible' : 'hidden'};
`;

const CheckboxLabel = styled.label`
  display: flex;
  align-items: center;
  gap: 8px;
  cursor: pointer;
  padding: 6px;
  user-select: none;
  font-size: 0.9rem;
`;

const CustomCheckbox = ({ checked, onChange, label }) => (
  <CheckboxLabel>
    <CheckboxContainer>
      <HiddenCheckbox checked={checked} onChange={onChange} />
      <StyledCheckbox $checked={checked}>
        <CheckIcon
          $checked={checked}
          viewBox="0 0 24 24"
          width="12"
          height="12"
        >
          <polyline points="20 6 9 17 4 12" />
        </CheckIcon>
      </StyledCheckbox>
    </CheckboxContainer>
    {label}
  </CheckboxLabel>
);

export default CustomCheckbox;
