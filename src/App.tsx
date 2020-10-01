import React, { useEffect, useState } from "react";
import AppBar from "@material-ui/core/AppBar";
import { Container, Typography, Toolbar, IconButton } from "@material-ui/core";
import { createStyles, makeStyles, Theme } from "@material-ui/core/styles";
import MoreVertIcon from "@material-ui/icons/MoreVert";
import SupervisorAccountIcon from "@material-ui/icons/SupervisorAccount";
import { ThemeProvider } from "./ThemeProvider";
import { API, graphqlOperation } from 'aws-amplify';
import { GetTaskQuery } from './API';
import { listTasks } from './graphql/queries';
import { withAuthenticator } from '@aws-amplify/ui-react';

const initialState = { name: '', description: '' }

function App() {
  const [tasks, setTasks] = useState([])

  useEffect(() => {
    fetchTasks()
  }, [])

  async function fetchTasks() {
    try {
      const taskData: any = await API.graphql(graphqlOperation(listTasks))
      const tasks = taskData.data.listTasks.items;
      setTasks(tasks)
    } catch (err) { console.log('error fetching tasks') }
  }

  const classes = useStyles();

  return (
    <ThemeProvider>
      <AppBar>
        <Toolbar>
          <Typography variant="h6" className={classes.title}>
            Thero
          </Typography>
          <IconButton edge="end" color="inherit" aria-label="teacher mode">
            <SupervisorAccountIcon />
          </IconButton>
          <IconButton edge="end" color="inherit" aria-label="menu">
            <MoreVertIcon />
          </IconButton>
        </Toolbar>
      </AppBar>
      <Container maxWidth="sm">{}
        <div>
          <h2>Amplify Tasks</h2>      {
            tasks.map((item: any, index) => (
              <div key={item.id ? item.id : index}>
                <p>{item.name}</p>
                <p>{item.description}</p>
              </div>
            ))
          }
        </div>

      </Container>
    </ThemeProvider>
  );
}

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    title: {
      flexGrow: 1,
    },
  })
);

export default withAuthenticator(App)
