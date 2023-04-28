import {
  Box,
  Button,
  FormControl,
  FormControlLabel,
  FormLabel,
  IconButton,
  Modal,
  Radio,
  RadioGroup,
  TextField,
  Typography,
} from '@mui/material';
import React, { useState } from 'react';
import CloseRoundedIcon from '@mui/icons-material/CloseRounded';
import dayjs from 'dayjs';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { MobileTimePicker } from '@mui/x-date-pickers/MobileTimePicker';
import { AdapterMoment } from '@mui/x-date-pickers/AdapterMoment';
import moment from 'moment';
import 'moment/locale/pt-br';

const style = {
  width: 400,
  borderRadius: 3,
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  bgcolor: '#222239',
  boxShadow: 24,
  p: 2,
};

const colors = ['#137cbd', '#D0FC60', '#7068FF', '#6EDDED', '#FCC760'];

const ModalTask = ({ open, handleOpen, getTasks, tasks }) => {
  const [taskNew, setTaskNew] = useState({
    titulo: '',
    inicio: '',
    fim: '',
    status: false,
    color: '#137cbd',
  });

  const saveTask = () => {
    localStorage.setItem('tasks', JSON.stringify([...tasks, taskNew]));
    handleOpen();
    getTasks();
  };

  const handleChangeValues = (name, value) => {
    setTaskNew({ ...taskNew, [name]: value });
  };

  return (
    <>
      <LocalizationProvider dateAdapter={AdapterMoment}>
        <Modal open={open} onClose={handleOpen}>
          <Box sx={style}>
            <IconButton
              sx={{ position: 'absolute', right: 0, top: 0 }}
              onClick={handleOpen}
            >
              <CloseRoundedIcon />
            </IconButton>
            <Typography variant="h6" sx={{ textAlign: 'center', pb: 3 }}>
              Criar tarefa
            </Typography>
            <Box
              sx={{
                display: 'flex',
                flexDirection: 'column',
                gap: 2,
              }}
            >
              <TextField
                fullWidth
                label="Título"
                variant="outlined"
                defaultValue={taskNew.titulo}
                onChange={(e) => handleChangeValues('titulo', e.target.value)}
              />
              <Box sx={{ display: 'flex', gap: 2 }}>
                <MobileTimePicker
                  label="Inicio"
                  defaultValue={taskNew.inicio}
                  format="HH:mm"
                  onChange={(e) =>
                    handleChangeValues('inicio', moment(e).format('HH:mm'))
                  }
                />

                <MobileTimePicker
                  defaultValue={taskNew.fim}
                  label="Fim"
                  format="HH:mm"
                  onChange={(e) =>
                    handleChangeValues('fim', moment(e).format('HH:mm'))
                  }
                />
              </Box>
              <FormControl>
                <FormLabel id="demo-controlled-radio-buttons-group">
                  Cor
                </FormLabel>
                <RadioGroup
                  row
                  value={taskNew.color}
                  onChange={(e) => handleChangeValues('color', e.target.value)}
                >
                  {colors.map((item, index) => {
                    return (
                      <>
                        <FormControlLabel
                          value={item}
                          key={`color-${index}`}
                          control={
                            <Radio
                              size="large"
                              sx={{
                                color: item,
                                '&.Mui-checked': {
                                  color: item,
                                },
                              }}
                            />
                          }
                        />
                      </>
                    );
                  })}
                </RadioGroup>
              </FormControl>
              <Box sx={{ display: 'flex', justifyContent: 'center' }}>
                <Button
                  sx={{ width: 150 }}
                  variant="outlined"
                  onClick={saveTask}
                >
                  Salvar
                </Button>
              </Box>
            </Box>
          </Box>
        </Modal>
      </LocalizationProvider>
    </>
  );
};

export default ModalTask;
