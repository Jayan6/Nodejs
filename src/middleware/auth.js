 const AdminAuth = (req, res, next) => {
    console.log('AdminAuth middleware');
    const token = 'xyz'
const isAdminAuthenticated = token === 'xy';

if (isAdminAuthenticated) {
    res.send('Admin route');
  next();
} else {
  res.status(401).send('Unauthorized');
}
};

const userAuth = (_req, _res, next) => {
    // TODO: implement real token/session validation here
    next();
};

module.exports = {
    adminAuth: AdminAuth,
    userAuth,
}