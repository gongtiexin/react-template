const globalModel = {
  namespace: 'global',
  state: {
    msg: '',
  },
  reducers: {
    reducersExample(params) {
      return params;
    },
  },
  effects: {
    effectsExample(state, { payload }) {
      return {
        ...state,
        ...payload,
      };
    },
  },
};

export default globalModel;
