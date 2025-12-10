const express = require('express');
const router = express.Router();

// In-memory data storage for notes
let notes = [];
let nextId = 1;

// Helper function to find note by ID
const findNoteById = (id) => {
  return notes.find(note => note.id === parseInt(id));
};

// @route    POST api/notes
// @desc     Create a new note
// @access   Public
router.post('/', (req, res) => {
  try {
    const { title, content } = req.body;

    // Validation
    if (!title || !content) {
      console.log('❌ CREATE NOTE FAILED: Missing title or content');
      return res.status(400).json({
        success: false,
        error: 'Title and content are required'
      });
    }

    // Create new note
    const newNote = {
      id: nextId++,
      title,
      content,
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString()
    };

    notes.push(newNote);

    console.log('=== NOTE CREATED ===');
    console.log('ID:', newNote.id);
    console.log('Title:', newNote.title);
    console.log('Content:', newNote.content);
    console.log('Created At:', newNote.createdAt);
    console.log('====================\n');

    res.status(201).json({
      success: true,
      message: 'Note created successfully',
      data: newNote
    });
  } catch (error) {
    console.error('Error creating note:', error.message);
    res.status(500).json({
      success: false,
      error: error.message
    });
  }
});

// @route    GET api/notes
// @desc     Get all notes
// @access   Public
router.get('/', (req, res) => {
  try {
    console.log('=== ALL NOTES RETRIEVED ===');
    console.log('Total Notes:', notes.length);
    notes.forEach((note, index) => {
      console.log(`\nNote ${index + 1}:`);
      console.log('  ID:', note.id);
      console.log('  Title:', note.title);
      console.log('  Content:', note.content.substring(0, 50) + (note.content.length > 50 ? '...' : ''));
    });
    console.log('===========================\n');

    res.json({
      success: true,
      count: notes.length,
      data: notes
    });
  } catch (error) {
    console.error('Error fetching notes:', error.message);
    res.status(500).json({
      success: false,
      error: error.message
    });
  }
});

// @route    GET api/notes/:id
// @desc     Get a specific note by ID
// @access   Public
router.get('/:id', (req, res) => {
  try {
    const note = findNoteById(req.params.id);

    if (!note) {
      console.log(`❌ NOTE NOT FOUND: ID ${req.params.id}`);
      return res.status(404).json({
        success: false,
        error: 'Note not found'
      });
    }

    console.log('=== NOTE RETRIEVED ===');
    console.log('ID:', note.id);
    console.log('Title:', note.title);
    console.log('Content:', note.content);
    console.log('Created At:', note.createdAt);
    console.log('Updated At:', note.updatedAt);
    console.log('======================\n');

    res.json({
      success: true,
      data: note
    });
  } catch (error) {
    console.error('Error fetching note:', error.message);
    res.status(500).json({
      success: false,
      error: error.message
    });
  }
});

// @route    PUT api/notes/:id
// @desc     Update a note
// @access   Public
router.put('/:id', (req, res) => {
  try {
    const note = findNoteById(req.params.id);

    if (!note) {
      console.log(`❌ UPDATE FAILED: Note ID ${req.params.id} not found`);
      return res.status(404).json({
        success: false,
        error: 'Note not found'
      });
    }

    const { title, content } = req.body;

    // Update fields if provided
    if (title) note.title = title;
    if (content) note.content = content;
    note.updatedAt = new Date().toISOString();

    console.log('=== NOTE UPDATED ===');
    console.log('ID:', note.id);
    console.log('New Title:', note.title);
    console.log('New Content:', note.content);
    console.log('Updated At:', note.updatedAt);
    console.log('====================\n');

    res.json({
      success: true,
      message: 'Note updated successfully',
      data: note
    });
  } catch (error) {
    console.error('Error updating note:', error.message);
    res.status(500).json({
      success: false,
      error: error.message
    });
  }
});

// @route    DELETE api/notes/:id
// @desc     Delete a note
// @access   Public
router.delete('/:id', (req, res) => {
  try {
    const noteIndex = notes.findIndex(note => note.id === parseInt(req.params.id));

    if (noteIndex === -1) {
      console.log(`❌ DELETE FAILED: Note ID ${req.params.id} not found`);
      return res.status(404).json({
        success: false,
        error: 'Note not found'
      });
    }

    const deletedNote = notes.splice(noteIndex, 1)[0];

    console.log('=== NOTE DELETED ===');
    console.log('ID:', deletedNote.id);
    console.log('Title:', deletedNote.title);
    console.log('Remaining Notes:', notes.length);
    console.log('====================\n');

    res.json({
      success: true,
      message: 'Note deleted successfully',
      data: deletedNote
    });
  } catch (error) {
    console.error('Error deleting note:', error.message);
    res.status(500).json({
      success: false,
      error: error.message
    });
  }
});

module.exports = router;
