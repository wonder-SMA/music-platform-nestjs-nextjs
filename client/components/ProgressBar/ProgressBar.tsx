import React from 'react';

import { getTrackProgress } from '../utils/functions';

interface ProgressBarProps {
  left: number;
  right: number;
  isTrackProgress?: boolean;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
}


const ProgressBar: React.FC<ProgressBarProps> = ({ left, right, isTrackProgress = false, onChange }) => {
  return (
    <div style={{ display: 'flex', justifyContent: 'space-between' }}>
      <input
        type="range"
        min={0}
        value={left}
        max={right}
        onChange={onChange}
      />
      {
        isTrackProgress
          ? <div style={{ width: 96, display: 'flex', justifyContent: 'end', marginLeft: '15px' }}
          >
            {getTrackProgress(left, right)}
          </div>
          :
          <div style={{ width: 69, display: 'flex', justifyContent: 'end', marginLeft: '15px' }}
          >
            {left} / {right}
          </div>
      }
    </div>
  );
};

export default ProgressBar;
