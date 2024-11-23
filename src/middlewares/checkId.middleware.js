const checkId = (req, res, next) => {
    const { id } = req.params;

    if (!isNaN(id)) return res.send('The Id should be Not a Number');

    next();
};

export default checkId;
