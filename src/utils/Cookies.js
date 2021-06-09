import jsCookie from 'js-cookie';

import { COOKIE_JWT_KEY } from '../constants/global';

export function setCookie(payload) {
  jsCookie.set(COOKIE_JWT_KEY, payload);
}

export function getCookie() {
  jsCookie.get(COOKIE_JWT_KEY);
}
