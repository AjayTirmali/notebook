// src/App.js
import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import NoteList from './components/NoteList';
import NoteForm from './components/NoteForm';
import { 
  Container, 
  Typography, 
  Box, 
  CssBaseline, 
  ThemeProvider, 
  createTheme,
  Paper,
  AppBar,
  Toolbar,
  IconButton
} from '@mui/material';
import NoteAltIcon from '@mui/icons-material/NoteAlt';
import { Link } from 'react-router-dom';

// Create a custom theme
const theme = createTheme({
  palette: {
    primary: {
      main: '#3f51b5',
    },
    secondary: {
      main: '#f50057',
    },
    background: {
      default: '#f5f5f5',
      paper: '#ffffff',
    },
  },
  typography: {
    fontFamily: '"Roboto", "Helvetica", "Arial", sans-serif',
    h4: {
      fontWeight: 600,
    },
  },
  components: {
    MuiPaper: {
      styleOverrides: {
        root: {
          borderRadius: 8,
          boxShadow: '0 4px 12px rgba(0,0,0,0.1)',
        },
      },
    },
    MuiButton: {
      styleOverrides: {
        root: {
          borderRadius: 8,
          textTransform: 'none',
          fontWeight: 600,
        },
      },
    },
  },
});

function App() {
  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <Router>
        <AppBar position="static" color="primary" elevation={0}>
          <Toolbar>
            <IconButton
              edge="start"
              color="inherit"
              component={Link}
              to="/"
              sx={{ mr: 2 }}
            >
              <NoteAltIcon />
            </IconButton>
            <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
              NoteMaster
            </Typography>
          </Toolbar>
        </AppBar>
        <Container maxWidth="md">
          <Box sx={{ my: 4 }}>
            <Paper elevation={3} sx={{ p: 3, mb: 4, borderRadius: 2 }}>
              <Typography variant="h4" component="h1" gutterBottom align="center" color="primary">
                Your Digital Notebook
              </Typography>
              <Typography variant="subtitle1" align="center" color="text.secondary" gutterBottom>
                Capture your thoughts, ideas, and reminders in one place
              </Typography>
            </Paper>
            <Paper elevation={2} sx={{ p: 3, borderRadius: 2 }}>
              <Routes>
                {/* Main route for listing notes */}
                <Route path="/" element={<NoteList />} />
                
                {/* Route for creating new notes */}
                <Route path="/create" element={<NoteForm />} />
                
                {/* Route for editing existing notes */}
                <Route path="/edit/:id" element={<NoteForm />} />
                
                {/* Catch-all route for handling 404s */}
                <Route path="*" element={<Navigate to="/" replace />} />
              </Routes>
            </Paper>
          </Box>
        </Container>
      </Router>
    </ThemeProvider>
  );
}

export default App;