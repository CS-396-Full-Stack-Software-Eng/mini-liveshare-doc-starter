import { useEffect, useState } from "react";
import { socket } from "./socket";
import "./App.css";
import { TextArea } from "./components";

function App() {
  const [isConnected, setConnected] = useState(socket.connected);

  console.log("isConnected", isConnected);

  useEffect(() => {
    const onConnect = () => {
      setConnected(true);
    };

    const onDisconnect = () => {
      setConnected(false);
    };

    socket.on("connect", onConnect);
    socket.on("disconnect", onDisconnect);

    socket.connect();

    return () => {
      socket.off("connect", onConnect);
      socket.off("disconnect", onDisconnect);
    };
  }, []);

  return (
    <>
      <h1>Mini Live Share Doc</h1>
      <TextArea />
    </>
  );
}

export default App;
