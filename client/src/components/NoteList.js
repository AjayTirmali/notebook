import React, { useEffect, useState } from 'react';
import { fetchNotes, deleteNote } from '../api';
import { 
  Grid, 
  Card, 
  CardContent, 
  CardActions, 
  Typography, 
  Button, 
  IconButton, 
  Container, 
  Alert, 
  Fab, 
  Divider,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
  Chip,
  Box,
  Tooltip,
  Fade
} from '@mui/material';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import AddIcon from '@mui/icons-material/Add';
import { Link, useNavigate } from 'react-router-dom';

function NoteList() {
  const [notes, setNotes] = useState([]);
  const [error, setError] = useState('');
  const [deleteDialogOpen, setDeleteDialogOpen] = useState(false);
  const [noteToDelete, setNoteToDelete] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    loadNotes();
  }, []);

  const loadNotes = async () => {
    try {
      const response = await fetchNotes();
      setNotes(response.data);
      setError('');
    } catch (error) {
      console.error(error);
      setError('Failed to load notes. Please try again.');
    }
  };

  const openDeleteDialog = (note) => {
    setNoteToDelete(note);
    setDeleteDialogOpen(true);
  };

  const closeDeleteDialog = () => {
    setDeleteDialogOpen(false);
    setNoteToDelete(null);
  };

  const handleDelete = async () => {
    try {
      await deleteNote(noteToDelete._id);
      setNotes(notes.filter(note => note._id !== noteToDelete._id));
      setError('');
      closeDeleteDialog();
    } catch (error) {
      console.error(error);
      setError('Failed to delete note. Please try again.');
      closeDeleteDialog();
    }
  };

  const handleEdit = (id) => {
    navigate(`/edit/${id}`);
  };

  // Function to format the date
  const formatDate = (dateString) => {
    const options = { year: 'numeric', month: 'short', day: 'numeric' };
    return new Date(dateString).toLocaleDateString(undefined, options);
  };

  return (
    <Container>
      <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 3 }}>
        <Typography variant="h5" component="h2" color="primary">
          My Notes
        </Typography>
        <Tooltip title="Create New Note" arrow>
          <Fab 
            color="primary" 
            component={Link} 
            to="/create" 
            size="medium"
          >
            <AddIcon />
          </Fab>
        </Tooltip>
      </Box>
      
      {error && (
        <Alert severity="error" sx={{ mb: 3 }}>
          {error}
        </Alert>
      )}

      {notes.length === 0 ? (
        <Box sx={{ 
          textAlign: 'center', 
          py: 5, 
          backgroundColor: 'rgba(0,0,0,0.02)', 
          borderRadius: 2 
        }}>
          <Typography variant="h6" color="text.secondary">
            No notes yet
          </Typography>
          <Typography variant="body2" color="text.secondary" sx={{ mt: 1 }}>
            Click the + button to create your first note
          </Typography>
        </Box>
      ) : (
        <Grid container spacing={3}>
          {notes.map(note => (
            <Fade in={true} key={note._id} timeout={500}>
              <Grid item xs={12} sm={6} md={4}>
                <Card 
                  sx={{ 
                    height: '100%', 
                    display: 'flex', 
                    flexDirection: 'column',
                    transition: 'transform 0.2s, box-shadow 0.2s',
                    '&:hover': {
                      transform: 'translateY(-4px)',
                      boxShadow: '0 8px 16px rgba(0,0,0,0.1)',
                    }
                  }}
                >
                  <CardContent sx={{ flexGrow: 1 }}>
                    <Typography variant="h6" component="h3" gutterBottom noWrap>
                      {note.title}
                    </Typography>
                    <Divider sx={{ my: 1 }} />
                    <Typography 
                      variant="body2" 
                      color="text.secondary" 
                      sx={{ 
                        whiteSpace: 'pre-wrap',
                        overflow: 'hidden',
                        textOverflow: 'ellipsis',
                        display: '-webkit-box',
                        WebkitLineClamp: 4,
                        WebkitBoxOrient: 'vertical',
                      }}
                    >
                      {note.content}
                    </Typography>
                  </CardContent>
                  <Box sx={{ px: 2, pb: 1 }}>
                    {note.updatedAt && (
                      <Chip 
                        label={`Updated: ${formatDate(note.updatedAt)}`} 
                        size="small" 
                        variant="outlined"
                        sx={{ fontSize: '0.7rem' }}
                      />
                    )}
                  </Box>
                  <CardActions sx={{ justifyContent: 'flex-end', p: 1 }}>
                    <Tooltip title="Edit Note">
                      <IconButton 
                        size="small" 
                        color="primary" 
                        onClick={() => handleEdit(note._id)}
                      >
                        <EditIcon />
                      </IconButton>
                    </Tooltip>
                    <Tooltip title="Delete Note">
                      <IconButton 
                        size="small" 
                        color="error" 
                        onClick={() => openDeleteDialog(note)}
                      >
                        <DeleteIcon />
                      </IconButton>
                    </Tooltip>
                  </CardActions>
                </Card>
              </Grid>
            </Fade>
          ))}
        </Grid>
      )}

      {/* Delete Confirmation Dialog */}
      <Dialog
        open={deleteDialogOpen}
        onClose={closeDeleteDialog}
        aria-labelledby="delete-dialog-title"
        aria-describedby="delete-dialog-description"
      >
        <DialogTitle id="delete-dialog-title">
          Delete Note
        </DialogTitle>
        <DialogContent>
          <DialogContentText id="delete-dialog-description">
            Are you sure you want to delete "{noteToDelete?.title}"? This action cannot be undone.
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={closeDeleteDialog} color="primary">
            Cancel
          </Button>
          <Button onClick={handleDelete} color="error" variant="contained">
            Delete
          </Button>
        </DialogActions>
      </Dialog>
    </Container>
  );
}

export default NoteList;
