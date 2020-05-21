const initialState = { avatar: require('../../images/ic_tag_faces.png') }

function setAvatar(state = initialState, action) {
  let nextState
  switch (action.type) {
    case 'SET_AVATAR':
        console.log(action.value)
        nextState = {
            ...state,
            avatar: action.value
        }
        return nextState || state
  default:
    return state
  }
}

export default setAvatar