import { createListenerMiddleware, AnyAction } from '@reduxjs/toolkit';

interface ActionPayload {
  status?: number;
  [key: string]: any;
}

interface TypedAction extends AnyAction {
  payload?: ActionPayload;
}

const authMiddleware = createListenerMiddleware();

authMiddleware.startListening({
  predicate: (action: TypedAction) => {
    return action?.payload?.status === 401;
  },
  effect: async (action, listenerApi) => {
    listenerApi.cancelActiveListeners();
    await listenerApi.delay(100);
    // Additional logic here...
  },
});

export default authMiddleware;
