
export const initialState = {
  users: []
};

export const usersReducer = (state, action) => {
  switch (action.type) {
    case 'SET_USERS':
      return { ...state, users: action.payload };
    case 'ADD_USER':
      return {
        ...state,
        users: [
          { id: Date.now().toString(), name: '', email: '', phone: '', country: '' },
          ...state.users
        ]
      };
    case 'UPDATE_USER_BY_ID':
      return {
        ...state,
        users: state.users.map(user =>
          user.id === action.payload.id
            ? { ...user, [action.payload.field]: action.payload.value }
            : user
        )
      };
    case 'DELETE_USER_BY_ID':
      return {
        ...state,
        users: state.users.filter(user => user.id !== action.payload)
      };
    default:
      return state;
  }
};
