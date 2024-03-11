interface Window {
    ipc: {
        send: (key, payload) => void;
    }
}