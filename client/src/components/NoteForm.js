import React, { useState, useEffect } from 'react';
import { createNote, updateNote, fetchNote } from '../api';
import { 
  TextField, 
  Button, 
  Container, 
  Typography, 
  Alert, 
  Paper, 
  Box, 
  CircularProgress,
  IconButton,
  Tooltip,
  Fade,
  Snackbar
} from '@mui/material';
import { useNavigate, useParams, Link } from 'react-router-dom';
import SaveIcon from '@mui/icons-material/Save';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';

function NoteForm() {
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const [saving, setSaving] = useState(false);
  const [success, setSuccess] = useState(false);
  const navigate = useNavigate();
  const { id } = useParams();
  const isEditMode = Boolean(id);

  useEffect(() => {
    if (id) {
      setLoading(true);
      fetchNote(id)
        .then(response => {
          const note = response.data;
          setTitle(note.title);
          setContent(note.content);
          setError('');
          setLoading(false);
        })
        .catch(error => {
          console.error(error);
          setError('Failed to load note. Please try again.');
          setLoading(false);
          setTimeout(() => navigate('/'), 2000);
        });
    }
  }, [id, navigate]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setSaving(true);
    const note = { title, content };

    try {
      if (id) {
        await updateNote(id, note);
        setSuccess(true);
        setTimeout(() => {
          navigate('/');
        }, 1500);
      } else {
        await createNote(note);
        navigate('/');
      }
    } catch (error) {
      console.error(error);
      setError('Failed to save note. Please try again.');
      setSaving(false);
    }
  };

  if (loading) {
    return (
      <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '300px' }}>
        <CircularProgress />
      </Box>
    );
  }

  return (
    <Fade in={true} timeout={500}>
      <Container>
        <Box sx={{ display: 'flex', alignItems: 'center', mb: 3 }}>
          <Tooltip title="Back to Notes">
            <IconButton 
              component={Link} 
              to="/" 
              color="primary"
              sx={{ mr: 2 }}
            >
              <ArrowBackIcon />
            </IconButton>
          </Tooltip>
          <Typography variant="h5" component="h2" color="primary">
            {isEditMode ? 'Edit Note' : 'Create New Note'}
          </Typography>
        </Box>

        {error && (
          <Alert severity="error" sx={{ mb: 3 }}>
            {error}
          </Alert>
        )}

        <Paper elevation={0} sx={{ p: 0 }}>
          <form onSubmit={handleSubmit}>
            <TextField
              label="Title"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              fullWidth
              margin="normal"
              required
              variant="outlined"
              InputProps={{
                sx: { 
                  fontSize: '1.2rem',
                  '& .MuiOutlinedInput-notchedOutline': {
                    borderColor: 'rgba(0, 0, 0, 0.1)',
                  },
                  '&:hover .MuiOutlinedInput-notchedOutline': {
                    borderColor: 'primary.main',
                  },
                }
              }}
              sx={{ mb: 2 }}
            />
            <TextField
              label="Content"
              value={content}
              onChange={(e) => setContent(e.target.value)}
              fullWidth
              margin="normal"
              multiline
              rows={8}
              required
              variant="outlined"
              placeholder="Write your thoughts here..."
              InputProps={{
                sx: { 
                  '& .MuiOutlinedInput-notchedOutline': {
                    borderColor: 'rgba(0, 0, 0, 0.1)',
                  },
                  '&:hover .MuiOutlinedInput-notchedOutline': {
                    borderColor: 'primary.main',
                  },
                }
              }}
            />
            <Box sx={{ display: 'flex', justifyContent: 'flex-end', mt: 3 }}>
              <Button 
                component={Link}
                to="/"
                variant="outlined" 
                color="primary"
                sx={{ mr: 2 }}
              >
                Cancel
              </Button>
              <Button 
                type="submit" 
                variant="contained" 
                color="primary"
                disabled={saving}
                startIcon={saving ? <CircularProgress size={20} /> : <SaveIcon />}
              >
                {isEditMode ? 'Update Note' : 'Save Note'}
              </Button>
            </Box>
          </form>
        </Paper>

        <Snackbar
          open={success}
          autoHideDuration={1500}
          message="Note saved successfully!"
          anchorOrigin={{ vertical: 'bottom', horizontal: 'center' }}
        />
      </Container>
    </Fade>
  );
}

export default NoteForm;
