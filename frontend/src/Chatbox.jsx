import { useState } from 'react'
import '@chatscope/chat-ui-kit-styles/dist/default/styles.min.css';
import { MainContainer, ChatContainer, MessageList, Message, MessageInput, TypingIndicator } from '@chatscope/chat-ui-kit-react';

const API_KEY = `${import.meta.env.VITE_OPENAI_KEY}`;

const Chatbox = (props) => {
    const {name, animal} = props

    const systemMessage = {
        "role": "system", 
        "content": `You are an endangered ${animal} called ${name} who isn't capable of handling complex tasks. 
        you live in the zoo and do nothing all day. pretend to be a zoo animal. 
        respond playfully and in under three sentences each time. don't use too many emojis`
    }

    const [messages, setMessages] = useState([
        {
        message: `Hi, I'm ${name}! Ask me anything!`,
        sentTime: "just now",
        sender: {name},
        direction: "incoming",
        position: "single"
        }
    ]);
    const [isTyping, setIsTyping] = useState(false);

    const handleSend = async (message) => {
        const newMessage = {
            message,
            direction: 'outgoing',
            sender: "user"
        };

        const newMessages = [...messages, newMessage];
        
        setMessages(newMessages);

        setIsTyping(true);
        await processMessageToChatGPT(newMessages);
    };

    async function processMessageToChatGPT(chatMessages) { 

        let apiMessages = chatMessages.map((messageObject) => {
            let role = "";
            if (messageObject.sender === "ChatGPT") {
                role = "assistant";
            } else {
                role = "user";
            }
            return { 
                role: role, content: messageObject.message
            }
        });

        const apiRequestBody = {
            "model": "gpt-3.5-turbo",
            "messages": [
                systemMessage,
                ...apiMessages 
            ]
        }

        await fetch("https://api.openai.com/v1/chat/completions", 
            {
                method: "POST",
                headers: {
                    "Authorization": "Bearer " + API_KEY,
                    "Content-Type": "application/json"
                },
                body: JSON.stringify(apiRequestBody)
                }).then((data) => {
                    return data.json();
                }).then((data) => {
                    console.log(data);
                    setMessages([...chatMessages, {
                        message: data.choices[0].message.content,
                        sender: {name},
                        direction: "incoming",
                        position: "single"
                }]);
                setIsTyping(false);
            });
    }

    return (
        <div className="App">
            <div style={{ position:"relative", height: "300px", width: "700px"  }}>
                <MainContainer>
                <ChatContainer>       
                    <MessageList 
                    scrollBehavior="smooth" 
                    typingIndicator={isTyping ? <TypingIndicator content="Typing..." /> : null}
                    >
                    {messages.map((m, i) => {
                        console.log(m)
                        return (
                            <Message 
                                key={i} 
                                model={m} 
                            />
                        );
                    })}
                    </MessageList>
                    <MessageInput placeholder="Type message here" onSend={handleSend} />        
                </ChatContainer>
                </MainContainer>
            </div>
        </div>
    )
}

export default Chatbox