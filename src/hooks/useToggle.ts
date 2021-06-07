import { useState } from 'react';

const useToggle = (initial = false) => {
  const [isOn, setIsOn] = useState(initial);

  return {
    isOn,
    on: () => setIsOn(true),
    off: () => setIsOn(false),
    reset: () => setIsOn(initial),
    toggle: () => setIsOn(isOn => !isOn),
  };
};

export default useToggle;
