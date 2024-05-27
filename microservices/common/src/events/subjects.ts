export enum Subjects {
  AuthConnected = 'auth:connected',
  AuthDisconnected = 'auth:disconnected',
  AuthUpdated = 'auth:updated',

  ProfileCreated = 'profile:created',
  ProfileUpdated = 'profile:updated',

  ProductCreated = 'product:created',
  ProductUpdated = 'product:updated',

  OrderCreated = 'order:created',
  OrderCancelled = 'order:cancelled',

  ExpirationComplete = 'expiration:complete',

  PaymentCreated = 'payment:created',
}
