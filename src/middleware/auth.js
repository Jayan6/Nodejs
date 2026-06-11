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

module.exports = {
    adminAuth: AdminAuth
}