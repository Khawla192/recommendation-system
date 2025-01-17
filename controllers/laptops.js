const express = require('express');
const router = express.Router();
const User = require('../models/user.js');

router.get('/', async (req, res) => {
    try {
        const currentUser = await User.findById(req.session.user._id);
        const allUsers = await User.find().populate('laptops');
        const laptop = currentUser.laptops || [];
        res.render('laptops/index.ejs', {
            users: allUsers,
            laptop,
        });
    } catch (error) {
        console.log(error);
        res.redirect('/');
    }
});

router.get('/profile', async (req, res) => {
    try {
        const currentUser = await User.findById(req.session.user._id);
        const laptop = currentUser.laptops || [];
        res.render('laptops/profile.ejs', {
            user: currentUser,
            laptop,
        });
    } catch (error) {
        console.log(error);
        res.redirect('/');
    }
});

router.get('/new', async (req, res) => {
    res.render('laptops/new.ejs');

});

router.post('/', async (req, res) => {
    try {
        if (req.body.touchscreen === "on") {
            req.body.touchscreen = true
        } else {
            req.body.touchscreen = false
        }
        const currentUser = await User.findById(req.session.user._id);
        const newLaptop = req.body;
        currentUser.laptops.push(newLaptop);
        await currentUser.save();
        res.redirect(`/users/${currentUser._id}/laptops`);
    } catch (error) {
        console.log(error);
        res.redirect('/');
    }
});

router.get('/:laptopId', async (req, res) => {
    try {
        const currentUser = await User.findById(req.session.user._id);
        const laptop = currentUser.laptops.id(req.params.laptopId);
        res.render('laptops/show.ejs', {
            laptop
        });
    } catch (error) {
        console.log(error);
        res.redirect('/');
    }
});

router.get('/laptops/:details', async (req, res) => {
    try {
        const currentUser = await User.findById(req.session.user._id);
        const laptop = currentUser.laptops.id(req.params.laptopId);
        // const { userId, laptopId } = req.params;
        // const user = await User.findById(userId);
        // const laptop = user.laptops.id(laptopId); 
        res.render('laptops/details.ejs', {
            laptop,
            currentUser,
        });
    } catch (error) {
        console.log(error);
        res.redirect('/');
    }
});

router.delete('/:laptopId', async (req, res) => {
    try {
        const currentUser = await User.findById(req.session.user._id);
        currentUser.laptops.id(req.params.laptopId).deleteOne();
        await currentUser.save();
        res.redirect(`/users/${currentUser._id}/laptops`);
    } catch (error) {
        console.log(error);
        res.redirect('/');
    }
});

router.get('/:laptopId/edit', async (req, res) => {
    try {
        const currentUser = await User.findById(req.session.user._id);
        const laptop = currentUser.laptops.id(req.params.laptopId);
        res.render('laptops/edit.ejs', {
            laptop
        });
    } catch (error) {
        console.log(error);
        res.redirect('/');
    }
});

router.put('/:laptopId', async (req, res) => {
    try {
        if (req.body.touchscreen === "on") {
            req.body.touchscreen = true
        } else {
            req.body.touchscreen = false
        }
        const currentUser = await User.findById(req.session.user._id);
        const laptop = currentUser.laptops.id(req.params.laptopId);
        laptop.set(req.body);
        await currentUser.save();
        res.redirect(
            `/users/${currentUser._id}/laptops/${req.params.laptopId}`
        );
    } catch (error) {
        console.log(error);
        res.redirect('/');
    }
});

module.exports = router;
