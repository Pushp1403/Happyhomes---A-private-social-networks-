package com.pushpendra.happyhomes.model.NoticesBills;

import java.io.Serializable;

import javax.persistence.*;

import com.pushpendra.happyhomes.model.society.Society;

import java.util.Date;


/**
 * The persistent class for the bill_templates database table.
 * 
 */
@Entity
@Table(name="bill_templates")
@NamedQuery(name="BillTemplate.findAll", query="SELECT b FROM BillTemplate b")
public class BillTemplate implements Serializable {
	private static final long serialVersionUID = 1L;

	@Id
	@GeneratedValue(strategy=GenerationType.AUTO)
	@Column(name="BILL_TEMPLATE_ID", unique=true, nullable=false)
	private int billTemplateId;

	@Column(name="ACTIVE_SWITCH")
	private int activeSwitch;

	@Column(name="CREATED_BY", length=100)
	private String createdBy;

	@Temporal(TemporalType.DATE)
	@Column(name="CREATED_DATE")
	private Date createdDate;

	@Column(name="TEMPLATE_DESCRIPTION", length=500)
	private String templateDescription;

	@Column(name="UPDATED_BY", length=100)
	private String updatedBy;

	@Temporal(TemporalType.DATE)
	@Column(name="UPDATED_DATE")
	private Date updatedDate;

	//bi-directional one-to-one association to BillType
	@OneToOne(fetch=FetchType.LAZY)
	@JoinColumn(name="BILL_TYPE_ID")
	private BillType billType;

	//bi-directional many-to-one association to Society
	@ManyToOne(fetch=FetchType.LAZY)
	@JoinColumn(name="SOCIETY_ID")
	private Society society;

	public BillTemplate() {
	}

	public int getBillTemplateId() {
		return this.billTemplateId;
	}

	public void setBillTemplateId(int billTemplateId) {
		this.billTemplateId = billTemplateId;
	}

	public int getActiveSwitch() {
		return this.activeSwitch;
	}

	public void setActiveSwitch(int activeSwitch) {
		this.activeSwitch = activeSwitch;
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

	public String getTemplateDescription() {
		return this.templateDescription;
	}

	public void setTemplateDescription(String templateDescription) {
		this.templateDescription = templateDescription;
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

	public BillType getBillType() {
		return this.billType;
	}

	public void setBillType(BillType billType) {
		this.billType = billType;
	}

	public Society getSociety() {
		return this.society;
	}

	public void setSociety(Society society) {
		this.society = society;
	}

}