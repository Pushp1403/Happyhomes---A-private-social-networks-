package com.pushpendra.happyhomes.model.Messaging;

import java.io.Serializable;

import javax.persistence.*;

import com.pushpendra.happyhomes.model.security.UserAuthenticationDetail;

import java.util.List;


/**
 * The persistent class for the chat database table.
 * 
 */
@Entity
@Table(name="chat")
@NamedQuery(name="Chat.findAll", query="SELECT c FROM Chat c")
public class Chat implements Serializable {
	private static final long serialVersionUID = 1L;

	@Id
	@GeneratedValue(strategy=GenerationType.AUTO)
	@Column(name="CHAT_ID", unique=true, nullable=false)
	private int chatId;

	//bi-directional many-to-one association to UserAuthenticationDetail
	@ManyToOne(fetch=FetchType.LAZY)
	@JoinColumn(name="FROM_USER_ID")
	private UserAuthenticationDetail fromUser;

	//bi-directional many-to-one association to UserAuthenticationDetail
	@ManyToOne(fetch=FetchType.LAZY)
	@JoinColumn(name="TO_USER_ID")
	private UserAuthenticationDetail toUser;

	//bi-directional many-to-one association to ChatThread
	@OneToMany(mappedBy="chat")
	private List<ChatThread> chatThreads;

	public Chat() {
	}

	public int getChatId() {
		return this.chatId;
	}

	public void setChatId(int chatId) {
		this.chatId = chatId;
	}

	public UserAuthenticationDetail getUserAuthenticationDetail1() {
		return this.fromUser;
	}

	public void setUserAuthenticationDetail1(UserAuthenticationDetail userAuthenticationDetail1) {
		this.fromUser = userAuthenticationDetail1;
	}

	public UserAuthenticationDetail getUserAuthenticationDetail2() {
		return this.toUser;
	}

	public void setUserAuthenticationDetail2(UserAuthenticationDetail userAuthenticationDetail2) {
		this.toUser = userAuthenticationDetail2;
	}

	public List<ChatThread> getChatThreads() {
		return this.chatThreads;
	}

	public void setChatThreads(List<ChatThread> chatThreads) {
		this.chatThreads = chatThreads;
	}

	public ChatThread addChatThread(ChatThread chatThread) {
		getChatThreads().add(chatThread);
		chatThread.setChat(this);

		return chatThread;
	}

	public ChatThread removeChatThread(ChatThread chatThread) {
		getChatThreads().remove(chatThread);
		chatThread.setChat(null);

		return chatThread;
	}

}