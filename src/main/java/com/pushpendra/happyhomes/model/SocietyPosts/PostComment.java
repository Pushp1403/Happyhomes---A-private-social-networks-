package com.pushpendra.happyhomes.model.SocietyPosts;

import java.io.Serializable;

import javax.persistence.*;

import com.pushpendra.happyhomes.model.security.UserAuthenticationDetail;

import java.util.Date;


/**
 * The persistent class for the post_comments database table.
 * 
 */
@Entity
@Table(name="post_comments")
@NamedQuery(name="PostComment.findAll", query="SELECT p FROM PostComment p")
public class PostComment implements Serializable {
	private static final long serialVersionUID = 1L;

	@Id
	@GeneratedValue(strategy=GenerationType.AUTO)
	@Column(name="COMMENT_ID", unique=true, nullable=false)
	private int commentId;

	@Column(name="COMMENT_DATA", length=2000)
	private String commentData;

	@Temporal(TemporalType.DATE)
	@Column(name="CREATED_DATE")
	private Date createdDate;

	@Temporal(TemporalType.DATE)
	@Column(name="UPDATED_DATE")
	private Date updatedDate;

	//bi-directional many-to-one association to PostSociety
	@ManyToOne(fetch=FetchType.LAZY)
	@JoinColumn(name="POST_ID")
	private PostSociety postSociety;

	//bi-directional one-to-one association to UserAuthenticationDetail
	@OneToOne(fetch=FetchType.LAZY)
	@JoinColumn(name="POSTED_BY")
	private UserAuthenticationDetail userAuthenticationDetail;

	public PostComment() {
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

	public Date getCreatedDate() {
		return this.createdDate;
	}

	public void setCreatedDate(Date createdDate) {
		this.createdDate = createdDate;
	}

	public Date getUpdatedDate() {
		return this.updatedDate;
	}

	public void setUpdatedDate(Date updatedDate) {
		this.updatedDate = updatedDate;
	}

	public PostSociety getPostSociety() {
		return this.postSociety;
	}

	public void setPostSociety(PostSociety postSociety) {
		this.postSociety = postSociety;
	}

	public UserAuthenticationDetail getUserAuthenticationDetail() {
		return this.userAuthenticationDetail;
	}

	public void setUserAuthenticationDetail(UserAuthenticationDetail userAuthenticationDetail) {
		this.userAuthenticationDetail = userAuthenticationDetail;
	}

}