const fs = require('fs');
const path = require('path');

module.exports = app => {

    // File path and callback
    fs.readFile('db/db.json','utf8', (err, data) => {
        if (err) throw err;
        var notes = JSON.parse(data);

        // Route HTTP GET requests to the specified path
        app.get('/api/notes', function(req, res) {
            res.json(notes);
        });

        // Route HTTP POST requests to the specified path
        app.post('/api/notes', function(req, res) {
            let newNote = req.body;
            notes.push(newNote);
            pushDb();
        });

        /// Route HTTP GET requests to the specified path with a specific id
        app.get('/api/notes/:id', function(req,res) {
            // display json for the notes array indices of the provided id
            res.json(notes[req.params.id]);
        });

        // Routes HTTP DELETE requests to the specified path with a specific id
        app.delete('/api/notes/:id', function(req, res) {
            notes.splice(req.params.id, 1);
            pushDb();
        });

        // GET notes.html
        app.get('/notes', function(req,res) {
            res.sendFile(path.join(__dirname, "../public/notes.html"));
        });
        
        // GET notes.html -wildcard in all other instances
        app.get('*', function(req,res) {
            res.sendFile(path.join(__dirname, "../public/index.html"));
        });

        //push updates to db json file on add, delete modifications
        function pushDb() {
            fs.writeFile('db/db.json',JSON.stringify(notes,'\t'),err => {
                if (err) throw err;
                return true;
            });
        }
    });
}