package com.pushpendra.happyhomes.model.Messaging;

import java.io.Serializable;
import javax.persistence.*;
import java.sql.Time;


/**
 * The persistent class for the chat_threads database table.
 * 
 */
@Entity
@Table(name="chat_threads")
@NamedQuery(name="ChatThread.findAll", query="SELECT c FROM ChatThread c")
public class ChatThread implements Serializable {
	private static final long serialVersionUID = 1L;

	@Id
	@GeneratedValue(strategy=GenerationType.AUTO)
	@Column(name="THREAD_ID", unique=true, nullable=false)
	private int threadId;

	@Column(name="THREAD_DATA", length=1000)
	private String threadData;

	@Column(name="THREAD_STATUS", length=1)
	private String threadStatus;

	@Column(name="THREAD_TIME")
	private Time threadTime;

	//bi-directional many-to-one association to Chat
	@ManyToOne(fetch=FetchType.LAZY)
	@JoinColumn(name="CHAT_ID")
	private Chat chat;

	public ChatThread() {
	}

	public int getThreadId() {
		return this.threadId;
	}

	public void setThreadId(int threadId) {
		this.threadId = threadId;
	}

	public String getThreadData() {
		return this.threadData;
	}

	public void setThreadData(String threadData) {
		this.threadData = threadData;
	}

	public String getThreadStatus() {
		return this.threadStatus;
	}

	public void setThreadStatus(String threadStatus) {
		this.threadStatus = threadStatus;
	}

	public Time getThreadTime() {
		return this.threadTime;
	}

	public void setThreadTime(Time threadTime) {
		this.threadTime = threadTime;
	}

	public Chat getChat() {
		return this.chat;
	}

	public void setChat(Chat chat) {
		this.chat = chat;
	}

}