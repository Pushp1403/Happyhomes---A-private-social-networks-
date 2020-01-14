package com.pushpendra.happyhomes.model.SocietyPosts;

import java.io.Serializable;

import javax.persistence.*;

import org.hibernate.annotations.Cascade;
import org.hibernate.annotations.CascadeType;

import com.pushpendra.happyhomes.model.security.UserAuthenticationDetail;
import com.pushpendra.happyhomes.model.society.Society;

import java.util.Date;
import java.util.List;


/**
 * The persistent class for the post_society database table.
 * 
 */
@Entity
@Table(name="post_society")
@NamedQuery(name="PostSociety.findAll", query="SELECT p FROM PostSociety p")
public class PostSociety implements Serializable {
	private static final long serialVersionUID = 1L;

	@Id
	@GeneratedValue(strategy=GenerationType.AUTO)
	@Column(name="POST_ID", unique=true, nullable=false)
	private int postId;

	@Column(name="CREATED_BY", length=100)
	private String createdBy;

	@Temporal(TemporalType.DATE)
	@Column(name="CREATED_DATE")
	private Date createdDate;

	@Column(name="EXTERNAL_SHARING_ALLOWED")
	private int externalSharingAllowed;

	@Column(name="POST_DATA", length=2000)
	private String postData;

	@Column(name="UPDATED_BY", length=100)
	private String updatedBy;

	@Temporal(TemporalType.DATE)
	@Column(name="UPDATED_DATE")
	private Date updatedDate;

	//bi-directional many-to-one association to Society
	@ManyToOne(fetch=FetchType.LAZY)
	@JoinColumn(name="SOCIETY_ID")
	private Society society;

	//bi-directional many-to-one association to UserAuthenticationDetail
	@ManyToOne(fetch=FetchType.EAGER)
	@JoinColumn(name="USER_ID")
	private UserAuthenticationDetail userAuthenticationDetail;

	//bi-directional many-to-one association to PostCatagory
	@ManyToOne(fetch=FetchType.LAZY)
	@JoinColumn(name="POST_CATAGORY")
	private PostCatagory postCatagoryBean;

	//bi-directional many-to-one association to PostComment
	@OneToMany(mappedBy="postSociety")
	private List<PostComment> postComments;

	//bi-directional many-to-one association to PostLike
	@OneToMany(mappedBy="postSociety")
	private List<PostLike> postLikes;

	public PostSociety() {
	}

	public int getPostId() {
		return this.postId;
	}

	public void setPostId(int postId) {
		this.postId = postId;
	}

	public String getCreatedBy() {
		return this.createdBy;
	}

	public void setCreatedBy(String createdBy) {
		this.createdBy = createdBy;
	}

	public Date getCreatedDate() {
		return this.createdDate;
	}

	public void setCreatedDate(Date createdDate) {
		this.createdDate = createdDate;
	}

	public int getExternalSharingAllowed() {
		return this.externalSharingAllowed;
	}

	public void setExternalSharingAllowed(int externalSharingAllowed) {
		this.externalSharingAllowed = externalSharingAllowed;
	}

	public String getPostData() {
		return this.postData;
	}

	public void setPostData(String postData) {
		this.postData = postData;
	}

	public String getUpdatedBy() {
		return this.updatedBy;
	}

	public void setUpdatedBy(String updatedBy) {
		this.updatedBy = updatedBy;
	}

	public Date getUpdatedDate() {
		return this.updatedDate;
	}

	public void setUpdatedDate(Date updatedDate) {
		this.updatedDate = updatedDate;
	}

	public Society getSociety() {
		return this.society;
	}

	public void setSociety(Society society) {
		this.society = society;
	}

	public UserAuthenticationDetail getUserAuthenticationDetail() {
		return this.userAuthenticationDetail;
	}

	public void setUserAuthenticationDetail(UserAuthenticationDetail userAuthenticationDetail) {
		this.userAuthenticationDetail = userAuthenticationDetail;
	}

	public PostCatagory getPostCatagoryBean() {
		return this.postCatagoryBean;
	}

	public void setPostCatagoryBean(PostCatagory postCatagoryBean) {
		this.postCatagoryBean = postCatagoryBean;
	}

	public List<PostComment> getPostComments() {
		return this.postComments;
	}

	public void setPostComments(List<PostComment> postComments) {
		this.postComments = postComments;
	}

	public PostComment addPostComment(PostComment postComment) {
		getPostComments().add(postComment);
		postComment.setPostSociety(this);

		return postComment;
	}

	public PostComment removePostComment(PostComment postComment) {
		getPostComments().remove(postComment);
		postComment.setPostSociety(null);

		return postComment;
	}

	public List<PostLike> getPostLikes() {
		return this.postLikes;
	}

	public void setPostLikes(List<PostLike> postLikes) {
		this.postLikes = postLikes;
	}

	public PostLike addPostLike(PostLike postLike) {
		getPostLikes().add(postLike);
		postLike.setPostSociety(this);

		return postLike;
	}

	public PostLike removePostLike(PostLike postLike) {
		getPostLikes().remove(postLike);
		postLike.setPostSociety(null);

		return postLike;
	}

}