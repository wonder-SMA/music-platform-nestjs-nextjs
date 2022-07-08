import React, { useState } from 'react';
import { GetServerSideProps } from 'next';
import { useRouter } from 'next/router';
import axios from 'axios';
import Button from '@mui/material/Button';
import Grid from '@mui/material/Grid';
import TextField from '@mui/material/TextField';

import MainLayout from '../../layouts/MainLayout';
import { useInput } from '../../hooks/useInput';
import { wrapper } from '../../store';
import { ITrack } from '../../types/Track';

const TrackPage = ({ serverTrack }) => {
  const [track, setTrack] = useState<ITrack>(serverTrack);
  const router = useRouter();
  const username = useInput('');
  const text = useInput('');

  const addComment = () => {
    axios.post(`http://localhost:${process.env.PORT}/tracks/comment`, {
      username: username.value,
      text: text.value,
      trackId: track._id
    })
      .then(response => setTrack({ ...track, comments: [...track.comments, response.data] }))
      .catch(console.log);
  };

  return (
    <MainLayout
      title={'Музыкальная площадка - ' + track.name + ' - ' + track.artist}
      keywords={'Музыка, артисты, ' + track.name + ', ' + track.artist}
    >
      <Button
        variant="outlined"
        style={{ fontSize: 32 }}
        onClick={() => router.push('/tracks')}
      >
        К списку
      </Button>
      <Grid container style={{ margin: '20px 0' }}>
        <img
          width="200"
          height="200"
          src={`http://localhost:${process.env.PORT}/${track.picture}`}
          alt="an album cover"
        />
        <div style={{ marginLeft: 30 }}>
          <h1>Название трека - {track.name}</h1>
          <h1>Исполнитель - {track.artist}</h1>
          <h1>Прослушиваний - {track.listens}</h1>
        </div>
      </Grid>
      <h1>Слова в треке</h1>
      <p>{track.text}</p>
      <h1>Комментарии</h1>
      <Grid container>
        <TextField
          {...username}
          label="Ваше имя"
          fullWidth
        />
        <TextField
          {...text}
          label="Комментарий"
          fullWidth
          multiline
          rows={4}
          style={{ marginTop: 10 }}
        />
        <Button onClick={addComment} style={{ marginTop: 10 }}>
          Отправить
        </Button>
      </Grid>
      <div>
        {track.comments.map((comment, index) =>
          <div key={index} style={{ marginTop: 10 }}>
            <div>Автор - {comment.username}</div>
            <div>Комментарий - {comment.text}</div>
          </div>
        )}
      </div>
    </MainLayout>
  );
};

export default TrackPage;

export const getServerSideProps: GetServerSideProps = wrapper.getServerSideProps(() =>
  async ({ params }) => {
    const response = await axios(`http://localhost:${process.env.PORT}/tracks/${params.id}`);
    return {
      props: {
        serverTrack: response.data
      }
    };
  }
);