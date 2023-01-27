import { Conversation } from "@rubberduck/common";
import React from "react";
import ReactMarkdown from "react-markdown";
import { ChatInput } from "./ChatInput";
import { ConversationHeader } from "./ConversationHeader";

export const ExpandedConversationView: React.FC<{
  conversation: Conversation;
  onSendMessage: (message: string) => void;
}> = ({ conversation, onSendMessage }) => (
  <div className={`explanation expanded`}>
    <ConversationHeader conversation={conversation} />

    <div className="detail">
      {conversation.messages.map((message) => (
        <div className={`chat-message ${message.author}`}>
          {message.author === "user" && message.content}
          {message.author === "bot" && (
            <ReactMarkdown>{message.content}</ReactMarkdown>
          )}
        </div>
      ))}
      {conversation.state.type === "waitingForBotAnswer" && (
        <div className={"in-progress"} />
      )}
      {conversation.state.type === "userCanReply" && (
        <ChatInput
          placeholder={conversation.messages.length > 0 ? "Reply…" : "Ask…"}
          onSend={onSendMessage}
        />
      )}
    </div>
  </div>
);