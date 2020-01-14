package com.pushpendra.happyhomes.model.NoticesBills;

import java.io.Serializable;

import javax.persistence.*;

import com.pushpendra.happyhomes.model.security.UserAuthenticationDetail;

import java.util.Date;


/**
 * The persistent class for the individual_bills database table.
 * 
 */
@Entity
@Table(name="individual_bills")
@NamedQuery(name="IndividualBill.findAll", query="SELECT i FROM IndividualBill i")
public class IndividualBill implements Serializable {
	private static final long serialVersionUID = 1L;

	@Id
	@GeneratedValue(strategy=GenerationType.AUTO)
	@Column(name="BILL_ID", unique=true, nullable=false)
	private int billId;

	@Column(name="BILL_MONTH")
	private int billMonth;

	@Column(name="BILL_REFERENCE_NO", length=50)
	private String billReferenceNo;

	@Column(name="CURRENT_BILL_AMOUNT")
	private int currentBillAmount;

	@Temporal(TemporalType.DATE)
	@Column(name="DUE_DATE")
	private Date dueDate;

	@Temporal(TemporalType.DATE)
	@Column(name="GENERATED_DATE")
	private Date generatedDate;

	@Column(name="PAYMENT_STATUS")
	private int paymentStatus;

	@Column(name="PREVIOUS_PENDING")
	private int previousPending;

	@Column(name="TOTAL_BILL_AMOUNT")
	private int totalBillAmount;

	//uni-directional one-to-one association to BillType
	@OneToOne(fetch=FetchType.LAZY)
	@JoinColumn(name="BILL_TYPE_ID")
	private BillType billType;
	
	@ManyToOne(fetch=FetchType.LAZY)
	@JoinColumn(name="BILLED_USER")
	private UserAuthenticationDetail billedUser;

	public IndividualBill() {
	}

	public int getBillId() {
		return this.billId;
	}

	public void setBillId(int billId) {
		this.billId = billId;
	}

	public int getBillMonth() {
		return this.billMonth;
	}

	public void setBillMonth(int billMonth) {
		this.billMonth = billMonth;
	}

	public String getBillReferenceNo() {
		return this.billReferenceNo;
	}

	public void setBillReferenceNo(String billReferenceNo) {
		this.billReferenceNo = billReferenceNo;
	}

	public int getCurrentBillAmount() {
		return this.currentBillAmount;
	}

	public void setCurrentBillAmount(int currentBillAmount) {
		this.currentBillAmount = currentBillAmount;
	}

	public Date getDueDate() {
		return this.dueDate;
	}

	public void setDueDate(Date dueDate) {
		this.dueDate = dueDate;
	}

	public Date getGeneratedDate() {
		return this.generatedDate;
	}

	public void setGeneratedDate(Date generatedDate) {
		this.generatedDate = generatedDate;
	}

	public int getPaymentStatus() {
		return this.paymentStatus;
	}

	public void setPaymentStatus(int paymentStatus) {
		this.paymentStatus = paymentStatus;
	}

	public int getPreviousPending() {
		return this.previousPending;
	}

	public void setPreviousPending(int previousPending) {
		this.previousPending = previousPending;
	}

	public int getTotalBillAmount() {
		return this.totalBillAmount;
	}

	public void setTotalBillAmount(int totalBillAmount) {
		this.totalBillAmount = totalBillAmount;
	}

	public BillType getBillType() {
		return this.billType;
	}

	public void setBillType(BillType billType) {
		this.billType = billType;
	}

}