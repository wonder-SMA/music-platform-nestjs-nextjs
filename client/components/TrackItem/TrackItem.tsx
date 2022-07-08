import axios from 'axios';
import React from 'react';
import { useRouter } from 'next/router';
import Card from '@mui/material/Card';
import IconButton from '@mui/material/IconButton';
import Grid from '@mui/material/Grid';
import { Delete, Pause, PlayArrow } from '@mui/icons-material';
import { useDispatch } from 'react-redux';
import styled from 'styled-components';

import { useActions } from '../../hooks/useActions';
import { useTypedSelector } from '../../hooks/useTypedSelector';
import { NextThunkDispatch } from '../../store';
import { deleteTrack } from '../../store/actions-creators/track';
import { ITrack } from '../../types/Track';
import { getTrackProgress } from '../utils/functions';

interface TrackItemProps {
  track: ITrack;
  activeTrack?: boolean;
}

const StyledTrackItem = styled(Card)`
  display: flex;
  align-items: center;
  margin: 20px;
  padding: 10px;

  img {
    transition: 0.3s;
    cursor: pointer;

    &:hover {
      transform: scale(1.1);
    }
  }
`;

const TrackItem: React.FC<TrackItemProps> = ({ track }) => {
  const router = useRouter();
  const { pause, activeTrack, duration, currentTime } = useTypedSelector(state => state.player);
  const { playTrack, pauseTrack, SetActiveTrack } = useActions();
  const dispatch = useDispatch() as NextThunkDispatch;

  const setActiveTrackHandler = () => {
    if (track !== activeTrack) {
      SetActiveTrack(track);
      axios.post(`http://localhost:${process.env.PORT}/tracks/listen/${track._id}`)
        .then(console.log)
        .catch(console.log);
    }
    pause ? playTrack() : pauseTrack();
  };

  const deleteTrackHandler = async () => {
    await dispatch(await deleteTrack(track._id));
  };

  return (
    <StyledTrackItem>
      <IconButton onClick={setActiveTrackHandler}>
        {track === activeTrack && !pause
          ? <Pause />
          : <PlayArrow />
        }
      </IconButton>
      <img
        width="70"
        height="70"
        src={`http://localhost:${process.env.PORT}/${track.picture}`}
        alt="an album cover"
        onClick={() => router.push('/tracks/' + track._id)}
      />
      <Grid container direction="column" style={{ width: 200, margin: '0 20px' }}>
        <div>{track.name}</div>
        <div style={{ fontSize: 12, color: 'gray' }}>{track.artist}</div>
      </Grid>
      {activeTrack && <div>{getTrackProgress(currentTime, duration)}</div>}
      <IconButton style={{ marginLeft: 'auto' }} onClick={deleteTrackHandler}>
        <Delete />
      </IconButton>
    </StyledTrackItem>
  );
};

export default TrackItem;
