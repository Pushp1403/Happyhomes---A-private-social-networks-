package com.pushpendra.happyhomes.model.SocietyPosts;

import java.io.Serializable;

import javax.persistence.*;

import com.pushpendra.happyhomes.model.security.UserAuthenticationDetail;


/**
 * The persistent class for the post_likes database table.
 * 
 */
@Entity
@Table(name="post_likes")
@NamedQuery(name="PostLike.findAll", query="SELECT p FROM PostLike p")
public class PostLike implements Serializable {
	private static final long serialVersionUID = 1L;

	@Id
	@GeneratedValue(strategy=GenerationType.AUTO)
	@Column(name="ACTIVITY_ID", unique=true, nullable=false)
	private int activityId;

	//bi-directional many-to-one association to PostSociety
	@ManyToOne(fetch=FetchType.LAZY)
	@JoinColumn(name="PARENT_POST_ID")
	private PostSociety postSociety;

	//bi-directional one-to-one association to ActivityType
	@OneToOne(fetch=FetchType.LAZY)
	@JoinColumn(name="ACTIVITY_TYPE_ID")
	private ActivityType activityType;

	//uni-directional one-to-one association to UserAuthenticationDetail
	@OneToOne(fetch=FetchType.LAZY)
	@JoinColumn(name="USER_ID")
	private UserAuthenticationDetail userAuthenticationDetail;

	public PostLike() {
	}

	public int getActivityId() {
		return this.activityId;
	}

	public void setActivityId(int activityId) {
		this.activityId = activityId;
	}

	public PostSociety getPostSociety() {
		return this.postSociety;
	}

	public void setPostSociety(PostSociety postSociety) {
		this.postSociety = postSociety;
	}

	public ActivityType getActivityType() {
		return this.activityType;
	}

	public void setActivityType(ActivityType activityType) {
		this.activityType = activityType;
	}

	public UserAuthenticationDetail getUserAuthenticationDetail() {
		return this.userAuthenticationDetail;
	}

	public void setUserAuthenticationDetail(UserAuthenticationDetail userAuthenticationDetail) {
		this.userAuthenticationDetail = userAuthenticationDetail;
	}

}