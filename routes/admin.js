const express = require('express');
const admin = express.Router();
const ensureLogin = require('connect-ensure-login');

const User = require('../models/user');
const Book = require('../models/book');
const BookList = require('../models/bookList');
const Message = require('../models/message');

let checkAdmin = function (req, res, next) {
    let role = 'ADMIN';
    if (req.user.role === role) {
        next();
    } else {
        res.redirect('/home');
    }
}

admin.use(ensureLogin.ensureLoggedIn('/login'));
admin.use(checkAdmin);

admin.get('/', (req, res, next) => {
    res.render('admin', {
        layout: 'private-layout',
        admin: req.user
    });
});

admin.get('/manage-users', (req, res, next) => {
    let notfound = 'No users found';
    (async () => {
        try {
            let users = await User.find();

            if (users !== null) {
                res.render('manage-users', {
                    layout: 'private-layout',
                    admin: req.user,
                    users
                });
            } else {
                res.render('manage-users', {
                    layout: 'private-layout',
                    admin: req.user,
                    error: notfound
                });
            }
        } catch (e) {
            console.log('GET /manage-users Error:', e.message)
        }

    })();
})



module.exports = admin;