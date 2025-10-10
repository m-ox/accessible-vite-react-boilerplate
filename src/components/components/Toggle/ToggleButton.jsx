import * as Toggle from '@radix-ui/react-toggle';
import './toggle-button.scss';

export const ToggleButton = ({ pressed, onPressedChange, children }) => (
  <Toggle.Root
    className="toggle-button"
    pressed={pressed}
    onPressedChange={onPressedChange}
  >
    {children}
  </Toggle.Root>
);
