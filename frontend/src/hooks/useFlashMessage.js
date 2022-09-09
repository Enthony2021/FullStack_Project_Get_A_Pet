import bus from "../utils/bus";

const useFlashMessage = () => {
  
    const setFlashMessages = (msg, type) => {
        bus.emit('flash', {
            message: msg,
            type: type
        })
    }

    return { setFlashMessages }
}

export default useFlashMessage