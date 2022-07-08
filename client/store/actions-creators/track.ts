import { Dispatch } from 'react';
import axios from 'axios';

import { TrackAction, TrackActionTypes } from '../../types/Track';

export const fetchTracks = () => {
  return async (dispatch: Dispatch<TrackAction>) => {
    try {
      const result = await axios(`http://localhost:${process.env.PORT}/tracks`);
      dispatch({ type: TrackActionTypes.FETCH_TRACKS, payload: result.data });
    } catch (e) {
      dispatch({
        type: TrackActionTypes.FETCH_TRACKS_ERROR,
        payload: 'Произошла ошибка при загрузке треков'
      });
    }
  };
};

export const deleteTrack = (id: string) => {
  return async (dispatch: Dispatch<TrackAction>) => {
    try {
      const result = await axios.delete(`http://localhost:${process.env.PORT}/tracks/${id}`);
      dispatch({ type: TrackActionTypes.DELETE_TRACK, payload: result.data });
    } catch (e) {
      dispatch({
        type: TrackActionTypes.DELETE_TRACK_ERROR,
        payload: 'Произошла ошибка при удалении трека'
      });
    }
  };
};

export const searchTracks = (query: string) => {
  return async (dispatch: Dispatch<TrackAction>) => {
    try {
      const result = await axios(`http://localhost:${process.env.PORT}/tracks/search?query=${query}`);
      dispatch({ type: TrackActionTypes.FETCH_TRACKS, payload: result.data });
    } catch (e) {
      dispatch({
        type: TrackActionTypes.FETCH_TRACKS_ERROR,
        payload: 'Произошла ошибка при загрузке треков'
      });
    }
  };
};