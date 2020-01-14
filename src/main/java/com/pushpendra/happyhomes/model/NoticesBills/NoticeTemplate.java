package com.pushpendra.happyhomes.model.NoticesBills;

import java.io.Serializable;

import javax.persistence.*;

import com.pushpendra.happyhomes.model.society.Society;

import java.util.Date;


/**
 * The persistent class for the notice_template database table.
 * 
 */
@Entity
@Table(name="notice_template")
@NamedQuery(name="NoticeTemplate.findAll", query="SELECT n FROM NoticeTemplate n")
public class NoticeTemplate implements Serializable {
	private static final long serialVersionUID = 1L;

	@Id
	@GeneratedValue(strategy=GenerationType.AUTO)
	@Column(name="TEMPLATE_ID", unique=true, nullable=false)
	private int templateId;

	@Column(name="ACTIVE_SWITCH")
	private int activeSwitch;

	@Temporal(TemporalType.DATE)
	@Column(name="CREATED_DATE")
	private Date createdDate;

	@Column(name="CRETAED_BY", length=100)
	private String cretaedBy;

	@Column(name="TEMPLATE_DESCRIPTION", length=1000)
	private String templateDescription;

	@Column(name="TEMPLATE_NAME", length=50)
	private String templateName;

	@Column(name="UPDATED_BY", length=100)
	private String updatedBy;

	@Temporal(TemporalType.DATE)
	@Column(name="UPDATED_DATE")
	private Date updatedDate;

	//bi-directional many-to-one association to Society
	@ManyToOne(fetch=FetchType.LAZY)
	@JoinColumn(name="SOCIETY_ID")
	private Society society;

	//uni-directional one-to-one association to TemplateCatagory
	@OneToOne(fetch=FetchType.LAZY)
	@JoinColumn(name="TEMPLATE_CATAGORY_ID")
	private TemplateCatagory templateCatagory;

	public NoticeTemplate() {
	}

	public int getTemplateId() {
		return this.templateId;
	}

	public void setTemplateId(int templateId) {
		this.templateId = templateId;
	}

	public int getActiveSwitch() {
		return this.activeSwitch;
	}

	public void setActiveSwitch(int activeSwitch) {
		this.activeSwitch = activeSwitch;
	}

	public Date getCreatedDate() {
		return this.createdDate;
	}

	public void setCreatedDate(Date createdDate) {
		this.createdDate = createdDate;
	}

	public String getCretaedBy() {
		return this.cretaedBy;
	}

	public void setCretaedBy(String cretaedBy) {
		this.cretaedBy = cretaedBy;
	}

	public String getTemplateDescription() {
		return this.templateDescription;
	}

	public void setTemplateDescription(String templateDescription) {
		this.templateDescription = templateDescription;
	}

	public String getTemplateName() {
		return this.templateName;
	}

	public void setTemplateName(String templateName) {
		this.templateName = templateName;
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

	public TemplateCatagory getTemplateCatagory() {
		return this.templateCatagory;
	}

	public void setTemplateCatagory(TemplateCatagory templateCatagory) {
		this.templateCatagory = templateCatagory;
	}

}