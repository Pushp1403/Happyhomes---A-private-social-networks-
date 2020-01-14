package com.pushpendra.happyhomes.model.SocietyPosts;

import java.io.Serializable;
import javax.persistence.*;


/**
 * The persistent class for the activity_type database table.
 * 
 */
@Entity
@Table(name="activity_type")
@NamedQuery(name="ActivityType.findAll", query="SELECT a FROM ActivityType a")
public class ActivityType implements Serializable {
	private static final long serialVersionUID = 1L;

	@Id
	@GeneratedValue(strategy=GenerationType.AUTO)
	@Column(name="ACTIVITY_TYPE_ID", unique=true, nullable=false)
	private int activityTypeId;

	@Column(name="ACTIVITY_TYPE", length=100)
	private String activityType;

	//bi-directional one-to-one association to PostLike
	@OneToOne(mappedBy="activityType", fetch=FetchType.LAZY)
	private PostLike postLike;

	public ActivityType() {
	}

	public int getActivityTypeId() {
		return this.activityTypeId;
	}

	public void setActivityTypeId(int activityTypeId) {
		this.activityTypeId = activityTypeId;
	}

	public String getActivityType() {
		return this.activityType;
	}

	public void setActivityType(String activityType) {
		this.activityType = activityType;
	}

	public PostLike getPostLike() {
		return this.postLike;
	}

	public void setPostLike(PostLike postLike) {
		this.postLike = postLike;
	}

}