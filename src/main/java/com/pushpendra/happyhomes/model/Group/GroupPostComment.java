package com.pushpendra.happyhomes.model.Group;

import java.io.Serializable;
import javax.persistence.*;
import java.util.Date;


/**
 * The persistent class for the group_post_comments database table.
 * 
 */
@Entity
@Table(name="group_post_comments")
@NamedQuery(name="GroupPostComment.findAll", query="SELECT g FROM GroupPostComment g")
public class GroupPostComment implements Serializable {
	private static final long serialVersionUID = 1L;

	@Id
	@GeneratedValue(strategy=GenerationType.AUTO)
	@Column(name="COMMENT_ID", unique=true, nullable=false)
	private int commentId;

	@Column(name="COMMENT_DATA", length=1000)
	private String commentData;

	@Temporal(TemporalType.DATE)
	@Column(name="COMMENT_DATE")
	private Date commentDate;

	@Column(name="COMMENT_USER_ID", length=50)
	private String commentUserId;

	@Temporal(TemporalType.DATE)
	@Column(name="UPDATED_DATE")
	private Date updatedDate;

	//bi-directional many-to-one association to GroupPost
	@ManyToOne(fetch=FetchType.LAZY)
	@JoinColumn(name="GROUP_POST_ID")
	private GroupPost groupPost;

	public GroupPostComment() {
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

	public Date getCommentDate() {
		return this.commentDate;
	}

	public void setCommentDate(Date commentDate) {
		this.commentDate = commentDate;
	}

	public String getCommentUserId() {
		return this.commentUserId;
	}

	public void setCommentUserId(String commentUserId) {
		this.commentUserId = commentUserId;
	}

	public Date getUpdatedDate() {
		return this.updatedDate;
	}

	public void setUpdatedDate(Date updatedDate) {
		this.updatedDate = updatedDate;
	}

	public GroupPost getGroupPost() {
		return this.groupPost;
	}

	public void setGroupPost(GroupPost groupPost) {
		this.groupPost = groupPost;
	}

}