package com.pushpendra.happyhomes.model.Group;

import java.io.Serializable;

import javax.persistence.*;

import com.pushpendra.happyhomes.model.society.Society;

import java.util.Date;
import java.util.List;


/**
 * The persistent class for the group_posts database table.
 * 
 */
@Entity
@Table(name="group_posts")
@NamedQuery(name="GroupPost.findAll", query="SELECT g FROM GroupPost g")
public class GroupPost implements Serializable {
	private static final long serialVersionUID = 1L;

	@Id
	@GeneratedValue(strategy=GenerationType.AUTO)
	@Column(name="GROUP_POST_ID", unique=true, nullable=false)
	private int groupPostId;

	@Column(name="POST_DATA", length=2000)
	private String postData;

	@Temporal(TemporalType.DATE)
	@Column(name="POST_DATE")
	private Date postDate;

	@Column(name="POSTED_BY", length=50)
	private String postedBy;

	//bi-directional many-to-one association to Group
	@ManyToOne(fetch=FetchType.LAZY)
	@JoinColumn(name="GROUP_ID")
	private Group group;

	//bi-directional many-to-one association to Society
	@ManyToOne(fetch=FetchType.LAZY)
	@JoinColumn(name="SOCIETY_ID")
	private Society society;

	//bi-directional many-to-one association to GroupPostPromote
	@OneToMany(mappedBy="groupPost")
	private List<GroupPostPromote> groupPostPromotes;

	//bi-directional many-to-one association to GroupPostComment
	@OneToMany(mappedBy="groupPost")
	private List<GroupPostComment> groupPostComments;

	public GroupPost() {
	}

	public int getGroupPostId() {
		return this.groupPostId;
	}

	public void setGroupPostId(int groupPostId) {
		this.groupPostId = groupPostId;
	}

	public String getPostData() {
		return this.postData;
	}

	public void setPostData(String postData) {
		this.postData = postData;
	}

	public Date getPostDate() {
		return this.postDate;
	}

	public void setPostDate(Date postDate) {
		this.postDate = postDate;
	}

	public String getPostedBy() {
		return this.postedBy;
	}

	public void setPostedBy(String postedBy) {
		this.postedBy = postedBy;
	}

	public Group getGroup() {
		return this.group;
	}

	public void setGroup(Group group) {
		this.group = group;
	}

	public Society getSociety() {
		return this.society;
	}

	public void setSociety(Society society) {
		this.society = society;
	}

	public List<GroupPostPromote> getGroupPostPromotes() {
		return this.groupPostPromotes;
	}

	public void setGroupPostPromotes(List<GroupPostPromote> groupPostPromotes) {
		this.groupPostPromotes = groupPostPromotes;
	}

	public GroupPostPromote addGroupPostPromote(GroupPostPromote groupPostPromote) {
		getGroupPostPromotes().add(groupPostPromote);
		groupPostPromote.setGroupPost(this);

		return groupPostPromote;
	}

	public GroupPostPromote removeGroupPostPromote(GroupPostPromote groupPostPromote) {
		getGroupPostPromotes().remove(groupPostPromote);
		groupPostPromote.setGroupPost(null);

		return groupPostPromote;
	}

	public List<GroupPostComment> getGroupPostComments() {
		return this.groupPostComments;
	}

	public void setGroupPostComments(List<GroupPostComment> groupPostComments) {
		this.groupPostComments = groupPostComments;
	}

	public GroupPostComment addGroupPostComment(GroupPostComment groupPostComment) {
		getGroupPostComments().add(groupPostComment);
		groupPostComment.setGroupPost(this);

		return groupPostComment;
	}

	public GroupPostComment removeGroupPostComment(GroupPostComment groupPostComment) {
		getGroupPostComments().remove(groupPostComment);
		groupPostComment.setGroupPost(null);

		return groupPostComment;
	}

}