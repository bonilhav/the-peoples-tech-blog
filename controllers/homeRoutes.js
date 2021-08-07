const router = require('express').Router();
const { User } = require('../models');
const withAuth = require('../utils/auth');


router.get('/', (req, res) => {
    res.render('homepage');
});

router.get('/login', (req, res) => {
    if (req.session.logged_in) {
        res.redirect('/');
        return;
    }
    res.render('login');
});

router.get('/dashboard', (req, res) => {
    if (req.session.logged_in) {
        res.redirect('/personalHomepage');
        return;
    }
    res.render('dashboard');
});

router.get('/register', (req, res) => {
    if (req.session.logged_in) {
        res.redirect('/');
        return;
    }
    res.render('register');
});


router.get('/personalHomepage', withAuth, async (req, res) => {
    if (req.session.logged_in) {
        res.redirect('/personalHomepage');
        return;
    }

    res.render('personalHomepage');
    
    /* try {
        const userData = await User.findAll({
            attributes: { exclude: ['password'] },
            order: [['firstName', 'lastName', 'ASC']],
        });
        console.log(userData);
        const users = userData.map((project) => project.get({ plain: true }));

        res.render('personalHomepage', {
            users,

            logged_in: req.session.logged_in,
        });
    } catch (err) {
        res.status(500).json(err);
    } */
});

module.exports = router;
