import { createStore } from 'easy-peasy';
import user, { UserStore } from './user';

export interface ApplicationStore {
    user: UserStore;
}

const state: ApplicationStore = {
    user,
};

export const store = createStore(state);
