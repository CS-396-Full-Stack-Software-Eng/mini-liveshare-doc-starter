import { useEffect, useState } from "react";
import { socket } from "../socket";

export default function TextArea() {
  const [input, setInput] = useState("");

  useEffect(() => {
    const onDocChange = (value) => {
      setInput(value);
    };

    socket.on("docChange", onDocChange);

    return () => {
      socket.off("docChange", onDocChange);
    };
  }, []);

  return (
    <textarea
      rows={100}
      cols={100}
      value={input}
      onChange={(e) => {
        setInput(e.target.value);

        socket.emit("inputChange", e.target.value);
      }}
    />
  );
}
