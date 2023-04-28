import React from 'react';
import './Task.css';
import { Box, Checkbox, IconButton, Typography } from '@mui/material';
import styled from '@emotion/styled';
import DeleteRoundedIcon from '@mui/icons-material/DeleteRounded';

const CustomIcon = styled('span')(({ theme }) => ({
  borderRadius: 3,
  width: 20,
  height: 20,
  boxShadow: '0 0 0 1px rgb(16 22 26 / 40%)',
  backgroundColor: '#394b59',
  backgroundImage:
    'linear-gradient(180deg,hsla(0,0%,100%,.05),hsla(0,0%,100%,0))',
  '.Mui-focusVisible &': {
    outline: '2px auto rgba(19,124,189,.6)',
    outlineOffset: 2,
  },
  'input:hover ~ &': {
    backgroundColor: '#30404d',
  },
  'input:disabled ~ &': {
    boxShadow: 'none',
    background: 'rgba(57,75,89,.5)',
  },
}));

const CustomCheckedIcon = styled(CustomIcon)({
  backgroundColor: '#137cbd',
  backgroundImage:
    'linear-gradient(180deg,hsla(0,0%,100%,.1),hsla(0,0%,100%,0))',
  '&:before': {
    display: 'block',
    width: 20,
    height: 20,
    backgroundImage:
      "url(\"data:image/svg+xml;charset=utf-8,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 16 16'%3E%3Cpath" +
      " fill-rule='evenodd' clip-rule='evenodd' d='M12 5c-.28 0-.53.11-.71.29L7 9.59l-2.29-2.3a1.003 " +
      "1.003 0 00-1.42 1.42l3 3c.18.18.43.29.71.29s.53-.11.71-.29l5-5A1.003 1.003 0 0012 5z' fill='%23fff'/%3E%3C/svg%3E\")",
    content: '""',
  },
  'input:hover ~ &': {
    backgroundColor: '#106ba3',
  },
});

const ColorTask = styled(Box)({
  width: 4,
  height: '100%',
  borderRadius: 5,
});

function CustomCheckBox(props) {
  return (
    <Checkbox
      sx={{
        '&:hover': { bgcolor: 'transparent' },
      }}
      disableRipple
      color="default"
      checkedIcon={<CustomCheckedIcon />}
      icon={<CustomIcon />}
      inputProps={{ 'aria-label': 'Checkbox demo' }}
      {...props}
    />
  );
}

const Task = ({ task, tasks, getTasks }) => {
  const deleteTask = () => {
    localStorage.setItem(
      'tasks',
      JSON.stringify(tasks.filter((item) => item.titulo != task.titulo)),
    );
    getTasks();
  };

  const handleStatusTask = () => {
    localStorage.setItem(
      'tasks',
      JSON.stringify([
        ...tasks.filter((item) => item.titulo != task.titulo),
        { ...task, status: !task.status },
      ]),
    );
    getTasks();
  };

  return (
    <>
      <Box
        sx={{ display: 'flex', justifyContent: 'space-between' }}
        className={task.status ? 'concludeTask' : 'taskLabel'}
      >
        <Box sx={{ display: 'flex', alignItems: 'center' }}>
          <ColorTask sx={{ backgroundColor: task.color }} />
          <CustomCheckBox onChange={handleStatusTask} />
          <Box>
            <Typography variant="h6">{task.titulo}</Typography>
            <Typography variant="p" color="#8c8c8c">
              {task.inicio} - {task.fim}
            </Typography>
          </Box>
        </Box>
        <Box>
          <IconButton onClick={deleteTask}>
            <DeleteRoundedIcon sx={{ color: '#eee' }} />
          </IconButton>
        </Box>
      </Box>
    </>
  );
};

export default Task;
