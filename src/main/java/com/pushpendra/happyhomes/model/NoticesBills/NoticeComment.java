package com.pushpendra.happyhomes.model.NoticesBills;

import java.io.Serializable;
import javax.persistence.*;
import java.util.Date;


/**
 * The persistent class for the notice_comments database table.
 * 
 */
@Entity
@Table(name="notice_comments")
@NamedQuery(name="NoticeComment.findAll", query="SELECT n FROM NoticeComment n")
public class NoticeComment implements Serializable {
	private static final long serialVersionUID = 1L;

	@Id
	@GeneratedValue(strategy=GenerationType.AUTO)
	@Column(name="COMMENT_ID", unique=true, nullable=false)
	private int commentId;

	@Column(name="COMMENT_DATA", length=2000)
	private String commentData;

	@Column(name="COMMENTED_BY", length=50)
	private String commentedBy;

	@Temporal(TemporalType.DATE)
	@Column(name="COMMENTED_DATE")
	private Date commentedDate;

	@Column(name="DELETE_SWITCH")
	private int deleteSwitch;

	@Temporal(TemporalType.DATE)
	@Column(name="UPDATED_DATE")
	private Date updatedDate;

	//bi-directional many-to-one association to SocietyNotice
	@ManyToOne(fetch=FetchType.LAZY)
	@JoinColumn(name="NOTICE_ID")
	private SocietyNotice societyNotice;

	public NoticeComment() {
	}

	public int getCommentId() {
		return this.commentId;
	}

	public void setCommentId(int commentId) {
		this.commentId = commentId;
	}

	public String getCommentData() {
		return this.commentData;
	}

	public void setCommentData(String commentData) {
		this.commentData = commentData;
	}

	public String getCommentedBy() {
		return this.commentedBy;
	}

	public void setCommentedBy(String commentedBy) {
		this.commentedBy = commentedBy;
	}

	public Date getCommentedDate() {
		return this.commentedDate;
	}

	public void setCommentedDate(Date commentedDate) {
		this.commentedDate = commentedDate;
	}

	public int getDeleteSwitch() {
		return this.deleteSwitch;
	}

	public void setDeleteSwitch(int deleteSwitch) {
		this.deleteSwitch = deleteSwitch;
	}

	public Date getUpdatedDate() {
		return this.updatedDate;
	}

	public void setUpdatedDate(Date updatedDate) {
		this.updatedDate = updatedDate;
	}

	public SocietyNotice getSocietyNotice() {
		return this.societyNotice;
	}

	public void setSocietyNotice(SocietyNotice societyNotice) {
		this.societyNotice = societyNotice;
	}

}