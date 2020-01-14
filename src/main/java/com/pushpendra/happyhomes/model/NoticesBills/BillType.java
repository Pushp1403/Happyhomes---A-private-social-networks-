package com.pushpendra.happyhomes.model.NoticesBills;

import java.io.Serializable;
import javax.persistence.*;


/**
 * The persistent class for the bill_type database table.
 * 
 */
@Entity
@Table(name="bill_type")
@NamedQuery(name="BillType.findAll", query="SELECT b FROM BillType b")
public class BillType implements Serializable {
	private static final long serialVersionUID = 1L;

	@Id
	@GeneratedValue(strategy=GenerationType.AUTO)
	@Column(name="BILL_TYPE_ID", unique=true, nullable=false)
	private int billTypeId;

	@Column(name="ACTIVE_SW")
	private int activeSw;

	@Column(name="BILL_NAME", length=50)
	private String billName;

	@Column(name="BILL_TYPE_DESCRIPTION", length=100)
	private String billTypeDescription;

	//bi-directional one-to-one association to BillTemplate
	@OneToOne(mappedBy="billType", fetch=FetchType.LAZY)
	private BillTemplate billTemplate;

	public BillType() {
	}

	public int getBillTypeId() {
		return this.billTypeId;
	}

	public void setBillTypeId(int billTypeId) {
		this.billTypeId = billTypeId;
	}

	public int getActiveSw() {
		return this.activeSw;
	}

	public void setActiveSw(int activeSw) {
		this.activeSw = activeSw;
	}

	public String getBillName() {
		return this.billName;
	}

	public void setBillName(String billName) {
		this.billName = billName;
	}

	public String getBillTypeDescription() {
		return this.billTypeDescription;
	}

	public void setBillTypeDescription(String billTypeDescription) {
		this.billTypeDescription = billTypeDescription;
	}

	public BillTemplate getBillTemplate() {
		return this.billTemplate;
	}

	public void setBillTemplate(BillTemplate billTemplate) {
		this.billTemplate = billTemplate;
	}

}