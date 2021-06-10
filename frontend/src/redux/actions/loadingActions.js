const loadingActions = {
    animationState: () => {
        return (dispatch) => {
            dispatch({type: 'ANIMATION_STATE', payload: false})
        }
      },

}
export default loadingActions