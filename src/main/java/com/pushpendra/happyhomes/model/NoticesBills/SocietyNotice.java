package com.pushpendra.happyhomes.model.NoticesBills;

import java.io.Serializable;

import javax.persistence.*;

import com.pushpendra.happyhomes.model.society.Society;

import java.util.Date;
import java.util.List;


/**
 * The persistent class for the society_notice database table.
 * 
 */
@Entity
@Table(name="society_notice")
@NamedQuery(name="SocietyNotice.findAll", query="SELECT s FROM SocietyNotice s")
public class SocietyNotice implements Serializable {
	private static final long serialVersionUID = 1L;

	@Id
	@GeneratedValue(strategy=GenerationType.AUTO)
	@Column(name="NOTICE_ID", unique=true, nullable=false)
	private int noticeId;

	@Column(name="ACTIVE_SWITCH")
	private int activeSwitch;

	@Column(name="CREATED_BY", length=50)
	private String createdBy;

	@Temporal(TemporalType.DATE)
	@Column(name="CREATED_DATE")
	private Date createdDate;

	@Column(name="NOTICE_CATAGORY_ID")
	private int noticeCatagoryId;

	@Column(name="NOTICE_DATA", length=1000)
	private String noticeData;

	@Temporal(TemporalType.DATE)
	@Column(name="NOTICE_EFFECTIVE_FROM")
	private Date noticeEffectiveFrom;

	@Column(name="NOTICE_TITLE", length=100)
	private String noticeTitle;

	//uni-directional one-to-one association to NoticeTemplate
	@OneToOne(fetch=FetchType.LAZY)
	@JoinColumn(name="NOTICE_TEMPLATE_ID")
	private NoticeTemplate noticeTemplate;

	//bi-directional many-to-one association to Society
	@ManyToOne(fetch=FetchType.LAZY)
	@JoinColumn(name="SOCIETY_ID")
	private Society society;

	//bi-directional many-to-one association to NoticeComment
	@OneToMany(mappedBy="societyNotice")
	private List<NoticeComment> noticeComments;

	public SocietyNotice() {
	}

	public int getNoticeId() {
		return this.noticeId;
	}

	public void setNoticeId(int noticeId) {
		this.noticeId = noticeId;
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

	public int getNoticeCatagoryId() {
		return this.noticeCatagoryId;
	}

	public void setNoticeCatagoryId(int noticeCatagoryId) {
		this.noticeCatagoryId = noticeCatagoryId;
	}

	public String getNoticeData() {
		return this.noticeData;
	}

	public void setNoticeData(String noticeData) {
		this.noticeData = noticeData;
	}

	public Date getNoticeEffectiveFrom() {
		return this.noticeEffectiveFrom;
	}

	public void setNoticeEffectiveFrom(Date noticeEffectiveFrom) {
		this.noticeEffectiveFrom = noticeEffectiveFrom;
	}

	public String getNoticeTitle() {
		return this.noticeTitle;
	}

	public void setNoticeTitle(String noticeTitle) {
		this.noticeTitle = noticeTitle;
	}

	public NoticeTemplate getNoticeTemplate() {
		return this.noticeTemplate;
	}

	public void setNoticeTemplate(NoticeTemplate noticeTemplate) {
		this.noticeTemplate = noticeTemplate;
	}

	public Society getSociety() {
		return this.society;
	}

	public void setSociety(Society society) {
		this.society = society;
	}

	public List<NoticeComment> getNoticeComments() {
		return this.noticeComments;
	}

	public void setNoticeComments(List<NoticeComment> noticeComments) {
		this.noticeComments = noticeComments;
	}

	public NoticeComment addNoticeComment(NoticeComment noticeComment) {
		getNoticeComments().add(noticeComment);
		noticeComment.setSocietyNotice(this);

		return noticeComment;
	}

	public NoticeComment removeNoticeComment(NoticeComment noticeComment) {
		getNoticeComments().remove(noticeComment);
		noticeComment.setSocietyNotice(null);

		return noticeComment;
	}

}