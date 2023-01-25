module.exports = mongoose => {
  const Chat = mongoose.model(
    "chat",
    mongoose.Schema(
      {
        sender: String,
        message: String,
      },
      { timestamps: true }
    )
  );
  return Chat;
};