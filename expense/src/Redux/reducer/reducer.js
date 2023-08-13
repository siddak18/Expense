const reducer=(state=[],action)=>{
    switch(action.type){
        case "ADD":
        return [action.payload,...state];
        case "GET":
        return [...action.payload];
        case "DELETE":
        return [...action.payload];
        case "X":
        return state;
        default :
        return state;
    }
}
export default reducer;