import './App.css';
import {
  Box,
  Button,
  Divider,
  SwipeableDrawer,
  ThemeProvider,
  Typography,
  createTheme,
} from '@mui/material';
import AddRoundedIcon from '@mui/icons-material/AddRounded';
import styled from '@emotion/styled';
import { useEffect, useState } from 'react';
import Task from './Components/Task/Task';
import ModalTask from './Components/Modal/ModalTask';

const ColorButton = styled(Button)(({ theme }) => ({
  backgroundColor: '#7068FF',
  '&:hover': {
    backgroundColor: '#45409c',
  },
}));

const CustomDivider = styled(Divider)(({ theme }) => ({
  borderColor: '#4a4646',
}));

const darkTheme = createTheme({
  palette: {
    mode: 'dark',
    primary: { main: '#7068FF' },
  },
});

function App() {
  const [tasks, setTasks] = useState([]);
  const [open, setOpen] = useState(false);

  const handleOpen = () => {
    setOpen(!open);
  };

  const getTasks = () => {
    if (localStorage.getItem('tasks')) {
      let tasksOrder = JSON.parse(localStorage.getItem('tasks'));
      tasksOrder = tasksOrder.sort(function compare(a, b) {
        if (parseFloat(a.inicio) < parseFloat(b.inicio)) return -1;
        if (parseFloat(a.inicio) > parseFloat(b.inicio)) return 1;
        return 0;
      });
      setTasks(tasksOrder);
    }
  };

  useEffect(() => {
    getTasks();
  }, []);

  return (
    <ThemeProvider theme={darkTheme}>
      <Box className="app">
        <Box className="card">
          <Box className="header">
            <Typography variant="h6" color="#fff">
              TODO
            </Typography>
          </Box>
          <Box className="tasksBox">
            <Box className="addTask">
              <Typography variant="h6" color="#8f8f8f" className="addTaskLabel">
                Adicione uma nova tarefa
              </Typography>
              <ColorButton variant="contained" onClick={handleOpen}>
                <AddRoundedIcon fontSize="large" />
              </ColorButton>
            </Box>
            <Box className="boxTasks">
              <Box className="counterTasks">
                <Box className="boxCounter">
                  <Typography variant="h6" color="#7068FF">
                    Criadas
                  </Typography>
                  <Typography className="counter" fontSize=".8rem">
                    {tasks.length}
                  </Typography>
                </Box>
                <Box className="boxCounter">
                  <Typography variant="h6" color="#7068FF">
                    Concluidas
                  </Typography>
                  <Typography className="counter" fontSize=".8rem">
                    {tasks.filter((item) => item.status == true).length}
                  </Typography>
                </Box>
              </Box>
              <CustomDivider />
              <Box className="tasks">
                {tasks.length > 0 ? (
                  tasks.map((item, index) => {
                    return (
                      <>
                        <Task
                          key={`task-${index}`}
                          tasks={tasks}
                          task={item}
                          getTasks={() => getTasks()}
                        />
                      </>
                    );
                  })
                ) : (
                  <Box className="noTasks">
                    <lord-icon
                      src="https://cdn.lordicon.com/kulwmpzs.json"
                      trigger="hover"
                      colors="primary:#fff"
                      state="hover"
                      style={{ width: '6vw', height: '20vh' }}
                    ></lord-icon>
                    <Typography variant="p" color="#eee">
                      Você ainda não tem tarefas criadas.
                    </Typography>
                  </Box>
                )}
              </Box>
            </Box>
          </Box>
        </Box>
      </Box>
      {open && (
        <ModalTask
          open={open}
          handleOpen={() => handleOpen()}
          getTasks={() => getTasks()}
          tasks={tasks}
        />
      )}
    </ThemeProvider>
  );
}

export default App;
