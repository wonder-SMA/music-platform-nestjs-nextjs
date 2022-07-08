import { TrackAction, TrackActionTypes, TrackState } from '../../types/Track';

const initialState: TrackState = {
  tracks: [],
  error: '',
  id: ''
};

export const trackReducer = (state = initialState, action: TrackAction): TrackState => {
  switch (action.type) {
    case TrackActionTypes.FETCH_TRACKS:
      return { ...state, tracks: action.payload };
    case TrackActionTypes.FETCH_TRACKS_ERROR:
      return { ...state, error: action.payload };
    case TrackActionTypes.DELETE_TRACK:
      return { ...state, tracks: state.tracks.filter(track => track._id !== action.payload) };
    case TrackActionTypes.DELETE_TRACK_ERROR:
      return { ...state, error: action.payload };
    default:
      return state;
  }
};