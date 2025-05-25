export class TimeManager {
  createExpirationDate() {
    const currentTime = Math.floor(Date.now() / 1000);
    const expirationTime =
      currentTime + parseInt(process.env.JWT_EXPIRATION_TIME ?? '3600') / 1000;

    return expirationTime;
  }
}
