import React, { useEffect, useState } from "react";
import {
  Box,
  Button,
  Card,
  CardActions,
  CardContent,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  Grid,
  IconButton,
  TextField,
  Typography,
  useTheme,
  Alert,
  Snackbar,
  Chip,
} from "@mui/material";
import AddIcon from "@mui/icons-material/Add";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
import RefreshIcon from "@mui/icons-material/Refresh";
import NoteAddIcon from "@mui/icons-material/NoteAdd";

interface Note {
  id: number;
  title: string;
  content: string;
  createdAt: string;
  updatedAt: string;
}

const API_BASE = "http://localhost:5025/api/notes";

const Notes = () => {
  const [notes, setNotes] = useState<Note[]>([]);
  const [openDialog, setOpenDialog] = useState(false);
  const [editMode, setEditMode] = useState(false);
  const [currentNote, setCurrentNote] = useState<Note | null>(null);
  const [formData, setFormData] = useState({ title: "", content: "" });
  const [snackbar, setSnackbar] = useState({
    open: false,
    message: "",
    severity: "success" as "success" | "error" | "info",
  });

  const theme = useTheme();

  // Fetch all notes
  const fetchNotes = async () => {
    try {
      const response = await fetch(API_BASE);
      const data = await response.json();
      if (data.success) {
        setNotes(data.data);
        console.log("Notes fetched:", data.data);
      }
    } catch (error) {
      console.error("Error fetching notes:", error);
      showSnackbar("Error fetching notes", "error");
    }
  };

  useEffect(() => {
    fetchNotes();
  }, []);

  // Show snackbar notification
  const showSnackbar = (
    message: string,
    severity: "success" | "error" | "info"
  ) => {
    setSnackbar({ open: true, message, severity });
  };

  // Handle dialog open/close
  const handleOpenDialog = (note?: Note) => {
    if (note) {
      setEditMode(true);
      setCurrentNote(note);
      setFormData({ title: note.title, content: note.content });
    } else {
      setEditMode(false);
      setCurrentNote(null);
      setFormData({ title: "", content: "" });
    }
    setOpenDialog(true);
  };

  const handleCloseDialog = () => {
    setOpenDialog(false);
    setEditMode(false);
    setCurrentNote(null);
    setFormData({ title: "", content: "" });
  };

  // Create or update note
  const handleSaveNote = async () => {
    if (!formData.title || !formData.content) {
      showSnackbar("Please fill in both title and content", "error");
      return;
    }

    try {
      const url = editMode ? `${API_BASE}/${currentNote?.id}` : API_BASE;
      const method = editMode ? "PUT" : "POST";

      const response = await fetch(url, {
        method,
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });

      const data = await response.json();

      if (data.success) {
        showSnackbar(
          editMode ? "Note updated successfully" : "Note created successfully",
          "success"
        );
        fetchNotes();
        handleCloseDialog();
      } else {
        showSnackbar(data.error || "Error saving note", "error");
      }
    } catch (error) {
      console.error("Error saving note:", error);
      showSnackbar("Error saving note", "error");
    }
  };

  // Delete note
  const handleDeleteNote = async (id: number) => {
    if (!window.confirm(`Are you sure you want to delete note #${id}?`)) {
      return;
    }

    try {
      const response = await fetch(`${API_BASE}/${id}`, {
        method: "DELETE",
      });

      const data = await response.json();

      if (data.success) {
        showSnackbar("Note deleted successfully", "success");
        fetchNotes();
      } else {
        showSnackbar(data.error || "Error deleting note", "error");
      }
    } catch (error) {
      console.error("Error deleting note:", error);
      showSnackbar("Error deleting note", "error");
    }
  };

  return (
    <Box>
      {/* Header Section */}
      <Box
        sx={{
          background: "linear-gradient(to bottom, #173039, #00b4c9)",
          padding: "50px 80px",
        }}
      >
        <Box
          sx={{
            [theme.breakpoints.up("sm")]: { maxWidth: "1400px" },
            width: "100%",
            margin: "auto",
            textAlign: "left",
          }}
        >
          <Typography
            sx={{
              fontSize: "45px",
              lineHeight: "60px",
              color: "#fff",
              fontWeight: 700,
              marginBottom: "20px",
            }}
          >
            📝 Notes Application
          </Typography>
          <Typography
            sx={{
              fontSize: "18px",
              color: "#fff",
              opacity: 0.9,
              marginBottom: "20px",
            }}
          >
            Create, manage, and organize your notes
          </Typography>
          <Box sx={{ display: "flex", gap: "10px" }}>
            <Button
              variant="contained"
              startIcon={<AddIcon />}
              onClick={() => handleOpenDialog()}
              sx={{
                backgroundColor: "#00dbe3",
                color: "#fff",
                fontWeight: 700,
                "&:hover": { backgroundColor: "#00c5cc" },
              }}
            >
              Create New Note
            </Button>
            <Button
              variant="outlined"
              startIcon={<RefreshIcon />}
              onClick={fetchNotes}
              sx={{
                borderColor: "#fff",
                color: "#fff",
                "&:hover": {
                  borderColor: "#00dbe3",
                  backgroundColor: "rgba(255,255,255,0.1)",
                },
              }}
            >
              Refresh
            </Button>
          </Box>
        </Box>
      </Box>

      {/* Main Content */}
      <Box
        sx={{
          minHeight: "calc(100vh - 450px)",
          backgroundColor: "#f5f5f5",
          padding: "40px 24px",
        }}
      >
        <Box
          sx={{
            [theme.breakpoints.up("sm")]: { maxWidth: "1400px" },
            width: "100%",
            margin: "auto",
          }}
        >
          {/* Stats */}
          <Box sx={{ marginBottom: "30px" }}>
            <Chip
              icon={<NoteAddIcon />}
              label={`Total Notes: ${notes.length}`}
              sx={{
                fontSize: "16px",
                padding: "20px 10px",
                backgroundColor: "#00dbe3",
                color: "#fff",
                fontWeight: 600,
              }}
            />
          </Box>

          {/* Notes Grid */}
          {notes.length === 0 ? (
            <Card
              sx={{
                padding: "60px",
                textAlign: "center",
                backgroundColor: "#fff",
              }}
            >
              <Typography variant="h6" color="textSecondary">
                No notes yet. Create your first note to get started! 🚀
              </Typography>
            </Card>
          ) : (
            <Grid container spacing={3}>
              {notes.map((note) => (
                <Grid item xs={12} sm={6} md={4} key={note.id}>
                  <Card
                    sx={{
                      height: "100%",
                      display: "flex",
                      flexDirection: "column",
                      borderLeft: "4px solid #00dbe3",
                      transition: "all 0.3s ease",
                      "&:hover": {
                        transform: "translateY(-5px)",
                        boxShadow: "0 5px 20px rgba(0,0,0,0.15)",
                      },
                    }}
                  >
                    <CardContent sx={{ flexGrow: 1 }}>
                      <Typography
                        variant="h6"
                        sx={{
                          color: "#173039",
                          fontWeight: 700,
                          marginBottom: "10px",
                        }}
                      >
                        {note.title}
                      </Typography>
                      <Typography
                        variant="body2"
                        color="textSecondary"
                        sx={{
                          marginBottom: "15px",
                          whiteSpace: "pre-wrap",
                        }}
                      >
                        {note.content.length > 150
                          ? note.content.substring(0, 150) + "..."
                          : note.content}
                      </Typography>
                      <Typography
                        variant="caption"
                        sx={{ color: "#999", display: "block" }}
                      >
                        ID: {note.id}
                      </Typography>
                      <Typography variant="caption" sx={{ color: "#999" }}>
                        Created: {new Date(note.createdAt).toLocaleString()}
                      </Typography>
                    </CardContent>
                    <CardActions sx={{ justifyContent: "flex-end", padding: 2 }}>
                      <IconButton
                        size="small"
                        onClick={() => handleOpenDialog(note)}
                        sx={{ color: "#00dbe3" }}
                      >
                        <EditIcon />
                      </IconButton>
                      <IconButton
                        size="small"
                        onClick={() => handleDeleteNote(note.id)}
                        sx={{ color: "#f44336" }}
                      >
                        <DeleteIcon />
                      </IconButton>
                    </CardActions>
                  </Card>
                </Grid>
              ))}
            </Grid>
          )}
        </Box>
      </Box>

      {/* Create/Edit Dialog */}
      <Dialog
        open={openDialog}
        onClose={handleCloseDialog}
        maxWidth="md"
        fullWidth
      >
        <DialogTitle
          sx={{
            backgroundColor: "#173039",
            color: "#fff",
            fontWeight: 700,
          }}
        >
          {editMode ? "✏️ Edit Note" : "➕ Create New Note"}
        </DialogTitle>
        <DialogContent sx={{ marginTop: "20px" }}>
          <TextField
            autoFocus
            margin="dense"
            label="Title"
            type="text"
            fullWidth
            variant="outlined"
            value={formData.title}
            onChange={(e) =>
              setFormData({ ...formData, title: e.target.value })
            }
            sx={{ marginBottom: "15px" }}
          />
          <TextField
            margin="dense"
            label="Content"
            type="text"
            fullWidth
            multiline
            rows={6}
            variant="outlined"
            value={formData.content}
            onChange={(e) =>
              setFormData({ ...formData, content: e.target.value })
            }
          />
        </DialogContent>
        <DialogActions sx={{ padding: "20px" }}>
          <Button onClick={handleCloseDialog} color="inherit">
            Cancel
          </Button>
          <Button
            onClick={handleSaveNote}
            variant="contained"
            sx={{
              backgroundColor: "#00dbe3",
              color: "#fff",
              fontWeight: 700,
              "&:hover": { backgroundColor: "#00c5cc" },
            }}
          >
            {editMode ? "Update" : "Create"}
          </Button>
        </DialogActions>
      </Dialog>

      {/* Snackbar for notifications */}
      <Snackbar
        open={snackbar.open}
        autoHideDuration={4000}
        onClose={() => setSnackbar({ ...snackbar, open: false })}
        anchorOrigin={{ vertical: "bottom", horizontal: "right" }}
      >
        <Alert
          onClose={() => setSnackbar({ ...snackbar, open: false })}
          severity={snackbar.severity}
          sx={{ width: "100%" }}
        >
          {snackbar.message}
        </Alert>
      </Snackbar>
    </Box>
  );
};

export default Notes;
