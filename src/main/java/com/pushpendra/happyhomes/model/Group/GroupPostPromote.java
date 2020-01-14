package com.pushpendra.happyhomes.model.Group;

import java.io.Serializable;
import javax.persistence.*;


/**
 * The persistent class for the group_post_promote database table.
 * 
 */
@Entity
@Table(name="group_post_promote")
@NamedQuery(name="GroupPostPromote.findAll", query="SELECT g FROM GroupPostPromote g")
public class GroupPostPromote implements Serializable {
	private static final long serialVersionUID = 1L;

	@Id
	@GeneratedValue(strategy=GenerationType.AUTO)
	@Column(name="GROUP_POST_ID", unique=true, nullable=false)
	private int groupPostId;

	@Column(name="PROMOTED_BY", length=50)
	private String promotedBy;

	@Column(name="PROMOTED_SWITCH")
	private int promotedSwitch;

	//bi-directional many-to-one association to GroupPost
	@ManyToOne(fetch=FetchType.LAZY)
	@JoinColumn(name="GROUP_POST_ID", referencedColumnName="GROUP_ID", nullable=false, insertable=false, updatable=false)
	private GroupPost groupPost;

	public GroupPostPromote() {
	}

	public int getGroupPostId() {
		return this.groupPostId;
	}

	public void setGroupPostId(int groupPostId) {
		this.groupPostId = groupPostId;
	}

	public String getPromotedBy() {
		return this.promotedBy;
	}

	public void setPromotedBy(String promotedBy) {
		this.promotedBy = promotedBy;
	}

	public int getPromotedSwitch() {
		return this.promotedSwitch;
	}

	public void setPromotedSwitch(int promotedSwitch) {
		this.promotedSwitch = promotedSwitch;
	}

	public GroupPost getGroupPost() {
		return this.groupPost;
	}

	public void setGroupPost(GroupPost groupPost) {
		this.groupPost = groupPost;
	}

}