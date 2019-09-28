import {   
  OPENMODAL,
  CLOSEMODAL
} from '../constants/scheduler'

export const openModal = () => { 
  return {
    type: OPENMODAL
  }
}
export const closeModal = () => {
  return {
    type: CLOSEMODAL
  }
}