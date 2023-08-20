const LightModeReducer = (state, action) => {
  switch (action.type) {
      case 'TOGGLE': {
          return {
              ...state,
              lightMode: !state.lightMode,
          };
      }

      case 'SWITCH_TO_LIGHT': {
          return {
              ...state,
              lightMode: true,
          };
      }

      default:
          return state;
  }
};

export default LightModeReducer;
