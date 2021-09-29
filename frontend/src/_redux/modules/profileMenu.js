function profileMenu(state= false, action) {

    switch( action.type ){
        case "PROFILE_MENU_TOGGLE":
            return action.payload;
        case "PROFILE_MENU_CLOSE":
            return false;
        default:
            return state; 
    }
}
export default profileMenu;