package com.pushpendra.happyhomes.model.SocietyPosts;

import java.io.Serializable;
import javax.persistence.*;
import java.util.Date;
import java.util.List;


/**
 * The persistent class for the post_catagory database table.
 * 
 */
@Entity
@Table(name="post_catagory")
@NamedQuery(name="PostCatagory.findAll", query="SELECT p FROM PostCatagory p")
public class PostCatagory implements Serializable {
	private static final long serialVersionUID = 1L;

	@Id
	@GeneratedValue(strategy=GenerationType.AUTO)
	@Column(name="CATAGORY_ID", unique=true, nullable=false)
	private int catagoryId;

	@Column(name="CATAGORY_NAME", length=100)
	private String catagoryName;

	@Column(name="CREATED_BY", length=100)
	private String createdBy;

	@Temporal(TemporalType.DATE)
	@Column(name="CREATED_DATE")
	private Date createdDate;

	@Column(name="UPDATED_BY", length=100)
	private String updatedBy;

	@Temporal(TemporalType.DATE)
	@Column(name="UPDATED_DATE")
	private Date updatedDate;

	//bi-directional many-to-one association to PostSociety
	@OneToMany(mappedBy="postCatagoryBean")
	private List<PostSociety> postSocieties;

	public PostCatagory() {
	}

	public int getCatagoryId() {
		return this.catagoryId;
	}

	public void setCatagoryId(int catagoryId) {
		this.catagoryId = catagoryId;
	}

	public String getCatagoryName() {
		return this.catagoryName;
	}

	public void setCatagoryName(String catagoryName) {
		this.catagoryName = catagoryName;
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

	public List<PostSociety> getPostSocieties() {
		return this.postSocieties;
	}

	public void setPostSocieties(List<PostSociety> postSocieties) {
		this.postSocieties = postSocieties;
	}

	public PostSociety addPostSociety(PostSociety postSociety) {
		getPostSocieties().add(postSociety);
		postSociety.setPostCatagoryBean(this);

		return postSociety;
	}

	public PostSociety removePostSociety(PostSociety postSociety) {
		getPostSocieties().remove(postSociety);
		postSociety.setPostCatagoryBean(null);

		return postSociety;
	}

}