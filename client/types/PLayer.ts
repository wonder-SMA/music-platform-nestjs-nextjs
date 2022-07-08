import { ITrack } from './Track';

export interface PlayerState {
  pause: boolean;
  activeTrack: null | ITrack;
  volume: number;
  duration: number;
  currentTime: number;
}

export enum PlayerActionTypes {
  PLAY = 'PLAY',
  PAUSE = 'PAUSE',
  SET_ACTIVE_TRACK = 'SET_ACTIVE_TRACK',
  SET_DURATION = 'SET_DURATION',
  SET_CURRENT_TIME = 'SET_CURRENT_TIME',
  SET_VOLUME = 'SET_VOLUME'
}

interface PlayAction {
  type: PlayerActionTypes.PLAY;
}

interface PauseAction {
  type: PlayerActionTypes.PAUSE;
}

interface SetActiveTrackAction {
  type: PlayerActionTypes.SET_ACTIVE_TRACK;
  payload: ITrack;
}

interface SetVolumeAction {
  type: PlayerActionTypes.SET_VOLUME;
  payload: number;
}

interface SetDurationAction {
  type: PlayerActionTypes.SET_DURATION;
  payload: number;
}

interface SetCurrentTimeAction {
  type: PlayerActionTypes.SET_CURRENT_TIME;
  payload: number;
}

export type PlayerAction =
  PlayAction
  | PauseAction
  | SetActiveTrackAction
  | SetVolumeAction
  | SetDurationAction
  | SetCurrentTimeAction;