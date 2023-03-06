// Dependencies
var express = require('express');
var router = express.Router();

// Models
var myTeam = require('../models/myteam');

// Routes
router.get('/getAll', async (req, res) => {
    try {
        const data = await myTeam.find();
        res.json(data)
    }
    catch (error) {
        res.status(500).json({ message: error.message })
    }
})

router.post('/addPlayer', async (req, res) => {
    const data = new myTeam({
        Name_of_Player: req.body.name,
        Role: req.body.role,
		Batting_Style: req.body.battingStyle,
		Bowling_Style: req.body.bowlingStyle
    })

    try {
        const dataToSave = await data.save();
        res.status(200).json(dataToSave)
    }
    catch (error) {
        res.status(400).json({ message: error.message })
    }
})

router.patch('/:id', async (req, res) => {
    try {
        const id = req.params.id;
        const updatedData = req.body;
        const options = { new: true };
        const result = await myTeam.findByIdAndUpdate(
            id, updatedData, options
        )
        
        res.send(result)
    }
    catch (error) {
        res.status(500).json({ message: error.message })
    }
})

router.delete('/delete/:id', async (req, res) => {
    try {
        const id = req.params.id;
        const data = await myTeam.findByIdAndDelete(id)
        res.send(`Document with ${data.name} has been deleted..`)
    }
    catch (error) {
        res.status(400).json({ message: error.message })
    }
})

router.get('/getByCenturies/:centuries', async (req, res) => {
    try {
        const data = await myTeam.find({"Role": req.params.centuries});
        res.json(data)
    }
    catch (error) {
        res.status(500).json({ message: error.message })
    }
})

router.get('/getByBattingStyle/:battingStyle', async (req, res) => {
    try {
        const data = await myTeam.find({"Batting_Style": req.params.battingStyle});
        res.json(data)
    }
    catch (error) {
        res.status(500).json({ message: error.message })
    }
})

router.get('/getByStyle/:battingStyle/:bowlingStyle', async (req, res) => {	
	var battingStyle = req.params.battingStyle;
	var bowlingStyle = req.params.bowlingStyle;

    try {
        const data = await myTeam.find({"Batting_Style": battingStyle, "Bowling_Style": bowlingStyle});
        res.json(data)
    }
    catch (error) {
        res.status(500).json({ message: error.message })
    }
})

router.get('/getEiterStyle/:battingStyle/:bowlingStyle', async (req, res) => {	
	var battingStyle = req.params.battingStyle;
	var bowlingStyle = req.params.bowlingStyle;

    try {
        const data = await myTeam.find({ $or: [ {"Batting_Style": battingStyle}, {"Bowling_Style": bowlingStyle} ]});
        res.json(data)
    }
    catch (error) {
        res.status(500).json({ message: error.message })
    }
})

router.get('/get/:id', async (req, res) => {
    try {
        const data = await myTeam.findById(req.params.id);
        res.json(data)
    }
    catch (error) {
        res.status(500).json({ message: error.message })
    }
})
// Return router
module.exports = router;
