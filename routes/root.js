const path = require('path');
const express = require('express');
const router = express.Router();

router.get(['/', '/index', '/index.html'], (req, res) => {
    res.sendFile(path.join(__dirname, '..', 'public', 'views', 'index.html'));
});

// router.get(['/old-page.html', '/old-page'], (req, res) => {
//     res.redirect(301, '/new-page.html');
// });
// router.get('/new-page.html', (req, res) => {
//     res.sendFile(path.join(__dirname, '..', 'views', 'new-page.html'));
// });

module.exports = router;