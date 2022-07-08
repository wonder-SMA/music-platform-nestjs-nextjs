import React, { useEffect } from 'react';
import styled from 'styled-components';
import Grid from '@mui/material/Grid';
import IconButton from '@mui/material/IconButton';
import { Pause, PlayArrow, VolumeUp } from '@mui/icons-material';

import ProgressBar from '../ProgressBar';
import { useActions } from '../../hooks/useActions';
import { useTypedSelector } from '../../hooks/useTypedSelector';
import { setVolume } from '../../store/actions-creators/player';

const StyledPlayer = styled.div`
  width: 100%;
  height: 60px;
  position: fixed;
  bottom: 0;
  display: flex;
  align-items: center;
  padding: 0 10px;
  background-color: lightgrey;
`;

let audio;

const Player: React.FC = () => {
  const { pause, activeTrack, volume, duration, currentTime } = useTypedSelector(state => state.player);
  const { playTrack, pauseTrack, setVolume, setDuration, setCurrentTime } = useActions();

  useEffect(() => {
    if (!audio && activeTrack) {
      audio = new Audio();
      setAudio();
    } else if (audio && activeTrack) {
      setAudio();
      playTrack();
    } else if (audio && activeTrack === null) {
      audio.pause();
      audio = null;
    }
  }, [activeTrack]);

  useEffect(() => {
    if (activeTrack) {
      !pause ? audio.play() : audio.pause();
    }
  }, [pause]);

  const setAudio = () => {
    if (activeTrack) {
      audio.src = `http://localhost:${process.env.PORT}/${activeTrack.audio}`;
      audio.volume = volume / 100;
      audio.onloadedmetadata = () => setDuration(Math.round(audio?.duration));
      audio.ontimeupdate = () => setCurrentTime(Math.round(audio?.currentTime));
    }
  };

  const setPlaybackHandler = () => {
    if (activeTrack) {
      pause ? playTrack() : pauseTrack();
    }
  };

  const setCurrentTimeHandler = (e: React.ChangeEvent<HTMLInputElement>) => {
    audio.currentTime = +e.target.value;
    setCurrentTime(+e.target.value);
  };

  const setVolumeHandler = (e: React.ChangeEvent<HTMLInputElement>) => {
    audio.volume = +e.target.value / 100;
    setVolume(+e.target.value);
  };

  if (!activeTrack) {
    return null;
  }

  return (
    <StyledPlayer>
      <IconButton onClick={setPlaybackHandler}>
        {pause
          ? <PlayArrow />
          : <Pause />
        }
      </IconButton>
      <Grid container direction="column" style={{ width: 200, margin: '0 20px' }}>
        <div>{activeTrack?.name}</div>
        <div style={{ fontSize: 12, color: 'gray' }}>{activeTrack?.artist}</div>
      </Grid>
      <ProgressBar left={currentTime} right={duration} isTrackProgress={true} onChange={setCurrentTimeHandler} />
      <VolumeUp style={{ marginLeft: 'auto' }} />
      <ProgressBar left={volume} right={100} onChange={setVolumeHandler} />
    </StyledPlayer>
  );
};

export default Player;
