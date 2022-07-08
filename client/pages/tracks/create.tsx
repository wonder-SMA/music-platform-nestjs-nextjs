import { useState } from 'react';
import { useRouter } from 'next/router';
import axios from 'axios';
import Button from '@mui/material/Button';
import Grid from '@mui/material/Grid';

import TextField from '@mui/material/TextField';
import FileUpload from '../../components/FileUpload';
import MainLayout from '../../layouts/MainLayout';
import StepWrapper from '../../components/StepWrapper';
import { useInput } from '../../hooks/useInput';

const Create = () => {
  const [activeStep, setActiveStep] = useState(0);
  const [picture, setPicture] = useState(null);
  const [audio, setAudio] = useState(null);
  const name = useInput('');
  const artist = useInput('');
  const text = useInput('');
  const router = useRouter();

  const next = () => {
    if (activeStep !== 2) {
      setActiveStep(prev => prev + 1);
    } else {
      audio.onloadedmetadata = () => {
      };
      const formData = new FormData();
      formData.append('name', name.value);
      formData.append('artist', artist.value);
      formData.append('text', text.value);
      formData.append('picture', picture);
      formData.append('audio', audio);
      axios.post(`http://localhost:${process.env.PORT}/tracks`, formData)
        .then(response => router.push('/tracks'))
        .catch(error => console.log(error));
    }
  };

  const back = () => {
    setActiveStep(prev => prev - 1);
  };

  return (
    <MainLayout>
      <StepWrapper activeStep={activeStep}>
        {activeStep === 0 &&
          <Grid container direction="column" style={{ padding: 20 }}>
            <TextField
              {...name}
              style={{ marginTop: 10 }}
              label="Название трека"
            />
            <TextField
              {...artist}
              style={{ marginTop: 10 }}
              label="Имя исполнителя"
            />
            <TextField
              {...text}
              style={{ marginTop: 10 }}
              label="Текст трека"
              multiline
              rows={3}
            />
          </Grid>
        }
        {activeStep === 1 &&
          <FileUpload setFile={setPicture} accept="image/*">
            <Button>Загрузить изображение</Button>
          </FileUpload>
        }
        {activeStep === 2 &&
          <FileUpload setFile={setAudio} accept="audio/*">
            <Button>Загрузите аудио</Button>
          </FileUpload>
        }
      </StepWrapper>
      <Grid container justifyContent="space-between">
        <Button disabled={activeStep === 0} onClick={back}>Назад</Button>
        <Button onClick={next}>Далее</Button>
      </Grid>
    </MainLayout>
  );
};

export default Create;
