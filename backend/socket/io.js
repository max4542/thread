const { Server } = require('socket.io');
const userConnectionRepository = require('../Repository/userConnectionRepository');

// Initialize the repository for the UserConnection model
const connRepo = new userConnectionRepository();
const setupSocketIO = (server) => {
  const io = new Server(server, {
    cors: {
      origin: '*',  // Allow all origins (adjust as needed for security)
      methods: ['GET', 'POST'],
    },
  });

  io.on('connection', (socket) => {
    console.log(`User connected: ${socket.id}`);

    // Listen for user login information
    socket.on('userLogin', async (user) => {
      if (!user || !user.id) {
        console.error('Invalid login data');
        return;
      }
      console.log(`User logged in: ${user.id}`);

      try {
        // Check if the user already has a connection, and update it if necessary
        const existingConnection = await connRepo.findOne({ where: { user_id: user.id } });

        if (existingConnection) {
          // Update the existing connection
          await connRepo.update(existingConnection.id, { socket_id: socket.id, status:'1' });
        } else {
          // Create a new connection
          await connRepo.create({ user_id: user.id, socket_id: socket.id , status : '1'});
        }

        // Emit a login success event
        socket.emit('loginSuccess', { message: `Welcome, ${user.name}`, userId: user.id });

      } catch (error) {
        console.error('Error handling user login:', error);
      }
    });

    // Get the list of currently online users
    socket.on('getOnlineUsers', async () => {
        try {
          // Fetch all online users from the database
          const onlineUsers = await connRepo.findAll({
            where: { status: '1' }, // '1' indicates online status
            attributes: ['user_id', 'socket_id', 'created_at'], // Select specific fields
          });
          // Emit the list of online users back to the requesting client
          socket.emit('onlineUsersList', { users: onlineUsers });
        } catch (error) {
          console.error('Error fetching online users:', error);
          socket.emit('onlineUsersListError', { message: 'Unable to fetch online users.' });
        }
      });
    

    // Listen for chat messages
    socket.on('chatMessage', async ({ senderId, recipientId, message }) => {
        if (!senderId || !recipientId || !message) return console.error('Invalid message data');
      
        try {
          const recipientConnection = await connRepo.findOne({ where: { user_id: recipientId } });
      
          if (recipientConnection?.socket_id) {
            io.to(recipientConnection.socket_id).emit('chatMessage', { senderId, message, timestamp: new Date() });
          } else {
            socket.emit('userOffline', { recipientId, message: 'User is offline' });
          }
        } catch (error) {
          console.error('Error sending message:', error);
          socket.emit('messageError', { message: 'Failed to send the message' });
        }
      });
      

    // // Handle user disconnection
    socket.on('disconnect', async () => {
        console.log(`User disconnected: ${socket.id}`);
      
        try {
          // Find the user connection by socket ID
          const existingConnection = await connRepo.findOne({ where: { socket_id: socket.id } });
          if (existingConnection) {
            // Update the user's status to offline
            await connRepo.update(existingConnection.id, { status: '0' });
            console.log(`User with socketId ${socket.id} has been set to offline.`);
          }
      
          // Notify other users about the disconnection
          io.emit('userDisconnected', { userId: existingConnection?.user_id });
        } catch (error) {
          console.error('Error handling user disconnection:', error);
        }
      });
      
  });

  return io;
};

module.exports = setupSocketIO;
