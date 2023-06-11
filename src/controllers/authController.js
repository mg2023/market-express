const User = require('../models/user');

const register = async (req, res) => {
  try {
    const { email, password } = req.body;
    const hashedPassword = await bcrypt.hash(password, 10);
    const user = new User(req.app.get('db'));
    await user.create(email, hashedPassword);
    res.status(201).json({ message: 'User registered successfully' });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

const login = async (req, res) => {
  try {
    const { email, password } = req.body;
    const user = new User(req.app.get('db'));
    const foundUser = await user.findByEmail(email);
    if (!foundUser) {
      return res.status(401).json({ error: 'Invalid email or password' });
    }
    const isPasswordValid = await bcrypt.compare(password, foundUser.password);
    if (!isPasswordValid) {
      return res.status(401).json({ error: 'Invalid email or password' });
    }
    const token = jwt.sign({ userId: foundUser.id }, 'your_secret_key');
    res.json({ token });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};