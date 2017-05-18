var serverOnValidator = function(req, res, next) {
    res.send('server on');
};

module.exports = serverOnValidator;