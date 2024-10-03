import express from 'express';
import http from 'http';
import { Server } from 'socket.io';
import mongoose, { Schema, model, models, Document } from 'mongoose';

// Mongoose Models
export interface INotification extends Document {
  recipient: Schema.Types.ObjectId; // User receiving the notification
  message: string; // Notification message
  isRead: boolean; // Read status
  createdAt: Date; // Timestamp
}

const NotificationSchema = new Schema({
  recipient: { type: Schema.Types.ObjectId, ref: 'User', required: true },
  message: { type: String, required: true },
  isRead: { type: Boolean, default: false },
  createdAt: { type: Date, default: Date.now },
});

const Notification = models.Notification || model('Notification', NotificationSchema);

// Express Setup
const app = express();
app.use(express.json());

// Create a server
const server = http.createServer(app);
const io = new Server(server);

// MongoDB Connection
mongoose.connect('mongodb+srv://admin:1230@cluster0.drtwozy.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0')
  .then(() => console.log('MongoDB connected'))
  .catch(err => console.error('MongoDB connection error:', err));

// Real-time Notifications Setup
io.on('connection', (socket) => {
  console.log('A user connected');

  // Handle disconnection
  socket.on('disconnect', () => {
    console.log('A user disconnected');
  });
});

// Function to create and send notifications
const createNotification = async (recipientId: Schema.Types.ObjectId, action: string) => {
  const message = action === 'answer'
    ? 'You have a new answer to your question!'
    : 'Your question has been created!';

  const notification = new Notification({
    recipient: recipientId,
    message,
  });

  await notification.save();

  // Emit the notification to the recipient
  io.to(recipientId.toString()).emit('notification', notification);
};

// Example Endpoint to Simulate User Actions
app.post('/questions', async (req, res) => {
  const { authorId } = req.body; // User ID who created the question

  // Simulate creating a question...
  // Here you would have your question creation logic

  // Create notification for the user who created the question
  await createNotification(authorId, 'create');

  res.status(201).json({ message: 'Question created and notification sent.' });
});

app.post('/answers', async (req, res) => {
  const { authorId, questionId } = req.body; // User ID who answered the question

  // Simulate answering a question...
  // Here you would have your answer creation logic

  // Create notification for the user who asked the question
  await createNotification(questionId, 'answer'); // Assume questionId refers to the userId of the question's author for simplicity

  res.status(201).json({ message: 'Answer submitted and notification sent.' });
});

// API Endpoint to Mark Notification as Read
app.post('/notifications/:id/read', async (req, res) => {
  const { id } = req.params;

  try {
    await Notification.findByIdAndUpdate(id, { isRead: true });
    res.status(200).json({ message: 'Notification marked as read' });
  } catch (error) {
    console.error('Error marking notification as read:', error);
    res.status(500).json({ message: 'Error marking notification as read' });
  }
});

// Start the server
server.listen(3000, () => {
  console.log('Server is running on port 3000');
});
