package com.pushpendra.happyhomes.model.NoticesBills;

import java.io.Serializable;
import javax.persistence.*;


/**
 * The persistent class for the template_catagory database table.
 * 
 */
@Entity
@Table(name="template_catagory")
@NamedQuery(name="TemplateCatagory.findAll", query="SELECT t FROM TemplateCatagory t")
public class TemplateCatagory implements Serializable {
	private static final long serialVersionUID = 1L;

	@Id
	@GeneratedValue(strategy=GenerationType.AUTO)
	@Column(name="CATAGORY_ID", unique=true, nullable=false)
	private int catagoryId;

	@Column(name="ACTIVE_SWITCH")
	private int activeSwitch;

	@Column(name="CATAGORY_NAME", length=100)
	private String catagoryName;

	public TemplateCatagory() {
	}

	public int getCatagoryId() {
		return this.catagoryId;
	}

	public void setCatagoryId(int catagoryId) {
		this.catagoryId = catagoryId;
	}

	public int getActiveSwitch() {
		return this.activeSwitch;
	}

	public void setActiveSwitch(int activeSwitch) {
		this.activeSwitch = activeSwitch;
	}

	public String getCatagoryName() {
		return this.catagoryName;
	}

	public void setCatagoryName(String catagoryName) {
		this.catagoryName = catagoryName;
	}

}