interface Window {
    ipc: {
        send: (channel, payload?) => void;
        on: (channel, payload) => void;
    }
}