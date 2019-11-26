// types
const OPEN = 'NOTICES_OPEN';
const CLOSE = 'NOTICES_CLOSE';

export const types = {
  OPEN,
  CLOSE,
};


// creators
const open = values => ({
  type: OPEN,
  values,
});

const close = values => ({
  type: CLOSE,
  values,
});

export const actions = {
  open,
  close,
};