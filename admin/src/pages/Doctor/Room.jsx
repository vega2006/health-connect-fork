import React, { useEffect, useCallback, useState } from "react";
import ReactPlayer from "react-player";
import peer from "../../service/peer";
import { useSocket } from "../../context/SocketProvider";

const Room = () => {
  const socket = useSocket();
  const [remoteSocketId, setRemoteSocketId] = useState(null);
  const [myStream, setMyStream] = useState();
  const [remoteStream, setRemoteStream] = useState();
  const [flag, setFlag] = useState(true);
  
  const handleUserJoined = useCallback(({ email, id }) => {
    console.log(`Email ${email} joined room`);
    setRemoteSocketId(id);
    console.log(`Remote Socket ID: ${id}`); // Log the correct ID
    handleCallUser(id); // Pass the ID directly to handleCallUser
  }, []);
  
  const handleCallUser = useCallback(
    async (id) => {
      const stream = await navigator.mediaDevices.getUserMedia({
        audio: true,
        video: true,
      });
      setMyStream(stream);
      const offer = await peer.getOffer();
      socket.emit("user:call", { to: id, offer }); // Use the passed ID
    },
    [socket]
  );

  const handleIncomingCall = useCallback(
    async ({ from, offer }) => {
      try {
        setRemoteSocketId(from);
        // Access user media
        const stream = await navigator.mediaDevices.getUserMedia({
          audio: true,
          video: true,
        }).catch((err) => {
          console.error("Error accessing media devices:", err);
          return null;
        });
  
        if (!stream) {
          console.error("No media stream available. Cannot proceed with call.");
          return;
        }
  
        setMyStream(stream);
        console.log(`Incoming Call`, from, offer);
  
        // Handle offer and send answer
        const ans = await peer.getAnswer(offer);
        socket.emit("call:accepted", { to: from, ans });
      } catch (error) {
        console.error("Error handling incoming call:", error);
      }
    },
    [socket]
  );
  

  const sendStreams = useCallback(() => {
    setFlag(false);
    for (const track of myStream.getTracks()) {
      peer.peer.addTrack(track, myStream);
    }
  }, [myStream]);

  const handleCallAccepted = useCallback(
    ({ from, ans }) => {
      peer.setLocalDescription(ans);
      console.log("Call Accepted!");
    },
    [sendStreams]
  );

  const handleNegoNeeded = useCallback(async () => {
    const offer = await peer.getOffer();
    socket.emit("peer:nego:needed", { offer, to: remoteSocketId });
  }, [remoteSocketId, socket]);
  useEffect(() => {
    peer.peer.addEventListener("negotiationneeded", handleNegoNeeded);
    return () => {
      peer.peer.removeEventListener("negotiationneeded", handleNegoNeeded);
    };
  }, [handleNegoNeeded]);

  const handleNegoNeedIncomming = useCallback(
    async ({ from, offer }) => {
      const ans = await peer.getAnswer(offer);
      socket.emit("peer:nego:done", { to: from, ans });
    },
    [socket]
  );

  const handleNegoNeedFinal = useCallback(async ({ ans }) => {
    await peer.setLocalDescription(ans);
    sendStreams();
  }, []);

  useEffect(() => {
    peer.peer.addEventListener("track", async (ev) => {
      const remoteStream = ev.streams;
      console.log("GOT TRACKS!!");
      setRemoteStream(remoteStream[0]);
    });
  }, []);

  useEffect(() => {
    socket.on("user:joined", handleUserJoined);
    socket.on("incomming:call", handleIncomingCall);
    socket.on("call:accepted", handleCallAccepted);
    socket.on("peer:nego:needed", handleNegoNeedIncomming);
    socket.on("peer:nego:final", handleNegoNeedFinal);

    return () => {
      socket.off("user:joined", handleUserJoined);
      socket.off("incomming:call", handleIncomingCall);
      socket.off("call:accepted", handleCallAccepted);
      socket.off("peer:nego:needed", handleNegoNeedIncomming);
      socket.off("peer:nego:final", handleNegoNeedFinal);
    };
  }, [
    socket,
    handleUserJoined,
    handleIncomingCall,
    handleCallAccepted,
    handleNegoNeedIncomming,
    handleNegoNeedFinal,
  ]);
  return (
    <div className="flex flex-col items-center justify-center min-h-screen  min-w-fit bg-gray-100">
      {/* Room Status */}
      {!remoteSocketId && (
        <h4 className="text-lg font-semibold text-gray-700 mb-4">
          No one in the room
        </h4>
      )}
  
      {/* Connect Button */}
      {flag&&myStream && (
        <button
          onClick={sendStreams}
          className="px-6 py-2 mb-4 text-white bg-blue-500 rounded-lg shadow-md hover:bg-blue-600 transition duration-300"
        >
          Connect
        </button>
      )}
  
      {/* My Stream Section */}
      {myStream && (
        <div className="mb-8">
          <h1 className="text-xl font-semibold text-gray-800 mb-2">My Stream</h1>
          <div className="border border-gray-300 rounded-lg shadow-md overflow-hidden">
            <ReactPlayer
              playing
              muted
              height="200px"
              width="350px"
              url={myStream}
              className="rounded-lg"
            />
          </div>
        </div>
      )}
  
      {/* Remote Stream Section */}
      {remoteStream && (
        <div>
          <h1 className="text-xl font-semibold text-gray-800 mb-2">
            Remote Stream
          </h1>
          <div className="border border-gray-300 rounded-lg shadow-md overflow-hidden">
            <ReactPlayer
              playing
              muted
              height="500px"
              width="650px"
              url={remoteStream}
              className="rounded-lg"
            />
          </div>
        </div>
      )}
    </div>
  );
};

export default Room;
