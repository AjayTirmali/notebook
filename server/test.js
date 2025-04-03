const axios = require('axios');

// Function to test the API
async function testAPI() {
  try {
    // Test GET /api/notes
    console.log('Testing GET /api/notes...');
    const response = await axios.get('http://localhost:5000/api/notes');
    console.log('Success! Notes:', response.data);
    
    // Test POST /api/notes
    console.log('\nTesting POST /api/notes...');
    const newNote = {
      title: 'Test Note',
      content: 'This is a test note created by the test script'
    };
    const postResponse = await axios.post('http://localhost:5000/api/notes', newNote);
    console.log('Success! Created note:', postResponse.data);
    
    // Test GET /api/notes/:id
    const noteId = postResponse.data._id;
    console.log(`\nTesting GET /api/notes/${noteId}...`);
    const getOneResponse = await axios.get(`http://localhost:5000/api/notes/${noteId}`);
    console.log('Success! Retrieved note:', getOneResponse.data);
    
    // Test PUT /api/notes/:id
    console.log(`\nTesting PUT /api/notes/${noteId}...`);
    const updatedNote = {
      title: 'Updated Test Note',
      content: 'This note has been updated by the test script'
    };
    const putResponse = await axios.put(`http://localhost:5000/api/notes/${noteId}`, updatedNote);
    console.log('Success! Updated note:', putResponse.data);
    
    // Test DELETE /api/notes/:id
    console.log(`\nTesting DELETE /api/notes/${noteId}...`);
    const deleteResponse = await axios.delete(`http://localhost:5000/api/notes/${noteId}`);
    console.log('Success! Deleted note:', deleteResponse.data);
    
    console.log('\nAll tests passed successfully!');
  } catch (error) {
    console.error('Error testing API:', error.response ? error.response.data : error.message);
  }
}

// Run the tests
testAPI(); 