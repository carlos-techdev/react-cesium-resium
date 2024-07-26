import { OPEN_DRAWER, CLOSE_DRAWER } from "./types";

export const openDrawer = (payload) => (dispatch) => {
  dispatch({
    type: OPEN_DRAWER,
    payload:{
        drawer:payload
    }
  });
};

export const closeDrawer=(payload)=>(dispatch)=>{
    dispatch({
        type:CLOSE_DRAWER
    });
}
