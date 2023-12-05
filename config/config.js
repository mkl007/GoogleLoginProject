
export const config = {
    port: process.env.PORT || 5000,
    mongoURI: process.env.MONGO_URI || 'mongodb://127.0.0.1:27017/oauth2',
    SUPERSECRET: process.env.JWT_SECRET || 'superSecretPassword'
  }
  