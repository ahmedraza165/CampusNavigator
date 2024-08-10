"use client";
import React, { useState, useRef, useEffect } from "react";
import MessageTextBox from "@/components/MessageTextBox";
import axios from "axios";
import { toast } from "react-toastify";
import { Avatar, Box, Typography } from "@mui/material";
import { useSession } from "next-auth/react";
import Image from "next/image";
import dynamic from "next/dynamic";
const DashboardLayout = dynamic(
  () => import("@/components/DashboardLayout/DashboardLayout"),
  {
    ssr: false,
  }
);
interface Message {
  role: string;
  text: string;
}

export default function Chat() {
  const [selectedChat, setSelectedChat] = useState(null as any);
  const [messages, setMessages] = useState<Message[]>([]);
  const [isBotTyping, setIsBotTyping] = useState(false);
  const [newChat, setNewChat] = useState();
  const [streamingChunks, setStreamingChunks] = useState("");
  const [pythonUrl, setPythonUrl] = useState("");
  const [chats, setChats] = useState([]);
  const { data }: any = useSession();
  const user = data?.user;
  const messagesEndRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (messagesEndRef.current) {
      messagesEndRef.current.scrollIntoView({ behavior: "smooth" });
    }
  }, [messages]);
  useEffect(() => {
    if (messagesEndRef.current) {
      messagesEndRef.current.scrollIntoView({ behavior: "smooth" });
    }
  }, [streamingChunks]);
  // Function to handle the selected chat
  const handleChatSelect = (chat: any) => {
    if (chat) {
      setSelectedChat(chat);
      fetchMessages(chat.id);
    } else {
      // If no chat is selected, reset selectedChat to null
      setSelectedChat(null);
    }
  };
  


  useEffect(() => {
    if (messagesEndRef.current) {
      messagesEndRef.current.scrollIntoView({ behavior: "smooth" });
    }
  }, [messages]);

  // Function to fetch messages
  const fetchMessages = async (chatId: any) => {
    try {
      const response = await axios.get(`/api/messages/${chatId}`);
      const { messages, pythonurl } = response.data;
      setPythonUrl(pythonurl);
      if (messages && messages.length > 0) {
        setMessages(messages);
      } else {
        setMessages([]);
      }
    } catch (error) {
      toast.error("Error fetching messages:");
      console.error("Error fetching messages:", error);
    }
  };

  const sendMessage = async ({
    message,
    source,
  }: {
    message: string;
    source: string;
  }) => {
    try {
      const API_KEY = "yhgbdgjkutrwdghtyu";
      const userMessage = { role: "user", text: message };
      setMessages((prevMessages: Message[]) =>
        prevMessages ? [...prevMessages, userMessage] : [userMessage]
      );

      let chat = {
        id: undefined,
      };
      if (selectedChat === "new") {
        // Call the API endpoint to create a new chat
        const response = await axios.post("/api/chat");
        chat = response.data?.chat;
        if (response?.data) {
          setSelectedChat(response.data?.chat);
          await fetchChats();
        }
      }

      const botResponse = (await fetch(`${pythonUrl}/get_response`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "api-key": API_KEY, // Ensure that the header is named "api-key"
        },
        body: JSON.stringify({ query: message, law_type: source }),
      })) as any;

      const reader = botResponse.body.getReader();
      let decoder = new TextDecoder("utf-8");
      // Show loading indicator
      toast.loading("Generating Response...", {
        autoClose: false,
        toastId: "loading-toast",
      });
      setIsBotTyping(true);
      let fullBotResponse = "";
      while (true) {
        const { done, value } = await reader.read();
        if (done) {
          setStreamingChunks("");
          break;
        }
        const chunk = decoder.decode(value);
        fullBotResponse += chunk;
        setStreamingChunks(fullBotResponse);
      }

      // After the loop, update messages
      setMessages((prevMessages: Message[]) => [
        ...prevMessages,
        { role: "assistant", text: fullBotResponse },
      ]);

      // Show loading indicator

      // Send the message and source to the server
      const response = await axios.post(
        `/api/messages/${selectedChat?.id || chat?.id}`,
        {
          message,
          response: fullBotResponse,
          source,
        }
      );

      // Scroll to the bottom immediately after adding a new message
      if (messagesEndRef.current) {
        messagesEndRef.current.scrollIntoView({
          behavior: "auto",
          block: "end",
        });
      }
      fetchChats();
      toast.dismiss("loading-toast");
    } catch (error) {
      toast.error("Error sending message:");
      console.error("Error sending message:", error);
      // Dismiss loading indicator on error
      toast.dismiss("loading-toast");
    }
  };

  const renderMessages = () => {
    return messages.map((message, index) => (
      <Box key={index} className="flex  mb-4">
        {message.role === "assistant" ? (
          <Box className="relative flex p-2 bg-green-50 gap-2 rounded-md">
            <Avatar sx={{ ml: "0" }}>
              <Image src="/bot.png" alt="bot" width={40} height={30} />
            </Avatar>

            <Box className="flex flex-col relative">
              <span className="font-bold text-green-700 bg-green-100 px-2 py-1 rounded-md">
               CampusNavigator
              </span>

              <Typography
                variant="body1"
                className="font-bold"
                sx={{
                  paddingTop: "25px",
                  textAlign: "justify",
                  lineHeight: "1.6",
                  fontWeight: "bold",
                }}
                dangerouslySetInnerHTML={{
                  __html: message.text.replace(/\n/g, "<br>"),
                }}
                id="result"
              ></Typography>
              <button
                className="absolute top-0 right-0 m-0 p-0 bg-white rounded-full hover:bg-gray-100"
                onClick={() => handleCopy(message.text)}
                title="Copy to Clipboard"
                style={{
                  border: "none",
                  outline: "none",
                  cursor: "pointer",
                  padding: "5px",
                  borderRadius: "50%",
                  boxShadow: "0px 2px 4px rgba(0, 0, 0, 0.1)",
                }}
              >
                <img
                  src="/copy.png"
                  alt="Copy"
                  className="h-5 w-5 text-gray-600"
                  style={{ width: "20px", height: "20px" }}
                />
              </button>
            </Box>
          </Box>
        ) : (
          <Box className=" p-2 bg-blue-50  rounded-md">
            <Box className={"flex items-center gap-2"}>
              <div className="bg-black text-white rounded-full w-8 h-8 flex items-center justify-center">
                {getUserInitials()}
              </div>
              <Typography
                className="font-bold"
                sx={{
                  fontWeight: "bold",
                }}
              >
                You
              </Typography>
            </Box>

            <Box className="flex flex-col">
              <Typography
                variant="body1"
                className="font-bold"
                sx={{
                  paddingTop: "8px",
                  paddingLeft: "35px",
                  fontWeight: "bold",
                }}
              >
                {message.text}
              </Typography>
            </Box>
          </Box>
        )}
      </Box>
    ));
  };

  const handleCopy = (text: string) => {
    navigator.clipboard.writeText(text);
    // Optionally, you can show a toast message indicating successful copy
    toast.success("Message copied to clipboard");
  };

  const getUserInitials = () => {
    // Assuming you have access to the user object
    const { firstName, lastName } = user;
    let initials = "";

    if (firstName) initials += firstName[0].toUpperCase();
    if (lastName) initials += lastName[0].toUpperCase();

    return initials;
  };
  const fetchChats = async () => {
    try {
      // Fetch the list of chats from the server
      const response = await axios.get("/api/chat");
      setChats(response.data.chats);
    } catch (error) {
      console.error("Error fetching chats:", error);
      toast.error("Error fetching chats");
    }
  };
  const handleNewChat = async () => {
    try {
      handleChatSelect("new");
    } catch (error) {
      console.error("Error creating new chat:", error);
      toast.error("Error creating new chat");
    } finally {
      await fetchChats();
    }
  };

  return (
    <DashboardLayout
      onChatSelect={handleChatSelect}
      handleNewChatProp={handleNewChat}
      fetchChats={fetchChats}
      chats={chats}
      newChat={newChat}
      selectedChat={selectedChat}
    >
      <div className="px-4 sm:px-6 lg:px-8 relative h-full max-w-4xl mx-auto bg-white">
        <div
          className="relative top-20 md:top-12 overflow-y-auto h-[calc(100vh-15rem)]"
          style={{
            overflowY: "scroll",
            scrollbarWidth: "none",
            msOverflowStyle: "none",
          }}
        >
          <style jsx>{`
            ::-webkit-scrollbar {
              display: none; /* Hide scrollbar for Chrome, Safari, and Opera */
            }
            /* Hide scrollbar for Firefox */
            div::-webkit-scrollbar-track {
              -webkit-box-shadow: none !important;
              background-color: transparent !important;
            }
          `}</style>
          <div className="space-y-5">
            {selectedChat ? (
              <div>
                {messages && messages.length > 0 ? (
                  <div>{renderMessages()}</div>
                ) : (
                  <div className="text-center">
                    <h1 className="text-3xl font-bold text-gray-800 mb-4">
                      How can I help you?
                    </h1>
                    <p className="text-lg text-gray-600">
                      Feel free to ask. I'm here to assist you.
                    </p>
                    <div className="bg-gray-100 text-black rounded-lg px-4  py-8 text-center mt-20">
                      <h2 className="text-2xl font-semibold mb-4">
                       Your personal Campus Navigator
                      </h2>
                      <p className="text-lg mb-4">
                       We are here to provide you with personalized career guidance and help you navigate campus resources.
                      </p>
                    </div>
                  </div>
                )}
                {streamingChunks && (
                  <Box className="flex mb-4">
                    <Box className="relative flex p-2 bg-green-50 gap-2 rounded-md">
                      <Avatar sx={{ ml: "0" }}>
                        <Image
                          src="/bot.png"
                          alt="bot"
                          width={40}
                          height={30}
                        />
                      </Avatar>

                      <Box className="flex flex-col relative">
                        <span className="font-bold text-green-700 bg-green-100 px-2 py-1 rounded-md">
                         CampusNavigator
                        </span>

                        <Typography
                          variant="body1"
                          className="font-bold"
                          sx={{
                            paddingTop: "25px",
                            textAlign: "justify",
                            lineHeight: "1.6",
                            fontWeight: "bold",
                          }}
                          dangerouslySetInnerHTML={{
                            __html: streamingChunks.replace(/\n/g, "<br>"),
                          }}
                          id="result"
                        ></Typography>
                        <button
                          className="absolute top-0 right-0 m-0 p-0 bg-white rounded-full hover:bg-gray-100"
                          onClick={() => handleCopy(streamingChunks)}
                          title="Copy to Clipboard"
                          style={{
                            border: "none",
                            outline: "none",
                            cursor: "pointer",
                            padding: "5px",
                            borderRadius: "50%",
                            boxShadow: "0px 2px 4px rgba(0, 0, 0, 0.1)",
                          }}
                        >
                          <img
                            src="/copy.png"
                            alt="Copy"
                            className="h-5 w-5 text-gray-600"
                            style={{ width: "20px", height: "20px" }}
                          />
                        </button>
                      </Box>
                    </Box>
                  </Box>
                )}
              </div>
            ) : (
              <div className="text-center">
                <h1 className="text-3xl font-bold text-gray-800 mb-4">
                  How can I help you?
                </h1>
                <p className="text-lg text-gray-600">
                  Feel free to ask. I'm here to assist you.
                </p>
                <div className="bg-gray-100 text-black rounded-lg px-4  py-8 text-center mt-20">
                <h2 className="text-2xl font-semibold mb-4">
                       Your personal Campus Navigator
                      </h2>
                      <p className="text-lg mb-4">
                       We are here to provide you with personalized career guidance and help you navigate campus resources.
                      </p>
                  <button
                    className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-3 md:py-4 px-20 md:px-24 rounded-lg text-lg"
                    onClick={handleNewChat}
                  >
                    New Chat
                  </button>
                </div>
              </div>
            )}
            <div ref={messagesEndRef} />
          </div>
          {selectedChat && <MessageTextBox onSend={sendMessage} />}
        </div>
      </div>
    </DashboardLayout>
  );
}
