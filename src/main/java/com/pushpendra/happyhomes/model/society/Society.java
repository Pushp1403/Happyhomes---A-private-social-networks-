package com.pushpendra.happyhomes.model.society;

import java.io.Serializable;

import javax.persistence.*;

import com.pushpendra.happyhomes.model.Events.EventDetail;
import com.pushpendra.happyhomes.model.Group.GroupPost;
import com.pushpendra.happyhomes.model.NoticesBills.BillTemplate;
import com.pushpendra.happyhomes.model.NoticesBills.NoticeTemplate;
import com.pushpendra.happyhomes.model.NoticesBills.SocietyNotice;
import com.pushpendra.happyhomes.model.SocietyPosts.PostSociety;
import com.pushpendra.happyhomes.model.Vendor.Vendor;

import java.util.Date;
import java.util.List;


/**
 * The persistent class for the society database table.
 * 
 */
@Entity
@Table(name="society")
@NamedQuery(name="Society.findAll", query="SELECT s FROM Society s")
public class Society implements Serializable {
	private static final long serialVersionUID = 1L;

	@Id
	@GeneratedValue(strategy=GenerationType.AUTO)
	@Column(name="society_id", unique=true, nullable=false)
	private int societyId;

	@Column(name="num_of_floors")
	private int numOfFloors;

	@Column(name="num_of_wings_block")
	private int numOfWingsBlock;

	@Column(name="society_address_line_1", length=255)
	private String societyAddressLine1;

	@Column(name="society_address_line_2", length=255)
	private String societyAddressLine2;

	@Column(name="society_city", length=255)
	private String societyCity;

	@Temporal(TemporalType.DATE)
	@Column(name="society_date_formed")
	private Date societyDateFormed;

	@Column(name="society_long_lat", length=255)
	private String societyLongLat;

	@Column(name="society_name", length=255)
	private String societyName;

	@Column(name="society_rating")
	private int societyRating;

	@Column(name="society_state", length=255)
	private String societyState;

	@Column(name="society_zip_code")
	private int societyZipCode;

	@Column(name="total_members")
	private int totalMembers;

	//bi-directional many-to-one association to PostSociety
	@OneToMany(mappedBy="society",fetch = FetchType.EAGER)
	private List<PostSociety> postSocieties;

	//bi-directional many-to-one association to EventDetail
	@OneToMany(mappedBy="society",fetch = FetchType.LAZY)
	private List<EventDetail> eventDetails;

	//bi-directional many-to-one association to GroupPost
	@OneToMany(mappedBy="society",fetch = FetchType.LAZY)
	private List<GroupPost> groupPosts;

	//bi-directional many-to-many association to Vendor
	@ManyToMany
	@JoinTable(
		name="vendor_society"
		, joinColumns={
			@JoinColumn(name="SOCIETY_ID")
			}
		, inverseJoinColumns={
			@JoinColumn(name="VENDOR_ID")
			}
		)
	private List<Vendor> vendors;

	//bi-directional many-to-one association to NoticeTemplate
	@OneToMany(mappedBy="society")
	private List<NoticeTemplate> noticeTemplates;

	//bi-directional many-to-one association to SocietyNotice
	@OneToMany(mappedBy="society")
	private List<SocietyNotice> societyNotices;

	//bi-directional many-to-one association to BillTemplate
	@OneToMany(mappedBy="society")
	private List<BillTemplate> billTemplates;

	public Society() {
	}

	public int getSocietyId() {
		return this.societyId;
	}

	public void setSocietyId(int societyId) {
		this.societyId = societyId;
	}

	public int getNumOfFloors() {
		return this.numOfFloors;
	}

	public void setNumOfFloors(int numOfFloors) {
		this.numOfFloors = numOfFloors;
	}

	public int getNumOfWingsBlock() {
		return this.numOfWingsBlock;
	}

	public void setNumOfWingsBlock(int numOfWingsBlock) {
		this.numOfWingsBlock = numOfWingsBlock;
	}

	public String getSocietyAddressLine1() {
		return this.societyAddressLine1;
	}

	public void setSocietyAddressLine1(String societyAddressLine1) {
		this.societyAddressLine1 = societyAddressLine1;
	}

	public String getSocietyAddressLine2() {
		return this.societyAddressLine2;
	}

	public void setSocietyAddressLine2(String societyAddressLine2) {
		this.societyAddressLine2 = societyAddressLine2;
	}

	public String getSocietyCity() {
		return this.societyCity;
	}

	public void setSocietyCity(String societyCity) {
		this.societyCity = societyCity;
	}

	public Date getSocietyDateFormed() {
		return this.societyDateFormed;
	}

	public void setSocietyDateFormed(Date societyDateFormed) {
		this.societyDateFormed = societyDateFormed;
	}

	public String getSocietyLongLat() {
		return this.societyLongLat;
	}

	public void setSocietyLongLat(String societyLongLat) {
		this.societyLongLat = societyLongLat;
	}

	public String getSocietyName() {
		return this.societyName;
	}

	public void setSocietyName(String societyName) {
		this.societyName = societyName;
	}

	public int getSocietyRating() {
		return this.societyRating;
	}

	public void setSocietyRating(int societyRating) {
		this.societyRating = societyRating;
	}

	public String getSocietyState() {
		return this.societyState;
	}

	public void setSocietyState(String societyState) {
		this.societyState = societyState;
	}

	public int getSocietyZipCode() {
		return this.societyZipCode;
	}

	public void setSocietyZipCode(int societyZipCode) {
		this.societyZipCode = societyZipCode;
	}

	public int getTotalMembers() {
		return this.totalMembers;
	}

	public void setTotalMembers(int totalMembers) {
		this.totalMembers = totalMembers;
	}

	public List<PostSociety> getPostSocieties() {
		return this.postSocieties;
	}

	public void setPostSocieties(List<PostSociety> postSocieties) {
		this.postSocieties = postSocieties;
	}

	public PostSociety addPostSociety(PostSociety postSociety) {
		getPostSocieties().add(postSociety);
		postSociety.setSociety(this);

		return postSociety;
	}

	public PostSociety removePostSociety(PostSociety postSociety) {
		getPostSocieties().remove(postSociety);
		postSociety.setSociety(null);

		return postSociety;
	}

	public List<EventDetail> getEventDetails() {
		return this.eventDetails;
	}

	public void setEventDetails(List<EventDetail> eventDetails) {
		this.eventDetails = eventDetails;
	}

	public EventDetail addEventDetail(EventDetail eventDetail) {
		getEventDetails().add(eventDetail);
		eventDetail.setSociety(this);

		return eventDetail;
	}

	public EventDetail removeEventDetail(EventDetail eventDetail) {
		getEventDetails().remove(eventDetail);
		eventDetail.setSociety(null);

		return eventDetail;
	}

	public List<GroupPost> getGroupPosts() {
		return this.groupPosts;
	}

	public void setGroupPosts(List<GroupPost> groupPosts) {
		this.groupPosts = groupPosts;
	}

	public GroupPost addGroupPost(GroupPost groupPost) {
		getGroupPosts().add(groupPost);
		groupPost.setSociety(this);

		return groupPost;
	}

	public GroupPost removeGroupPost(GroupPost groupPost) {
		getGroupPosts().remove(groupPost);
		groupPost.setSociety(null);

		return groupPost;
	}

	public List<Vendor> getVendors() {
		return this.vendors;
	}

	public void setVendors(List<Vendor> vendors) {
		this.vendors = vendors;
	}

	public List<NoticeTemplate> getNoticeTemplates() {
		return this.noticeTemplates;
	}

	public void setNoticeTemplates(List<NoticeTemplate> noticeTemplates) {
		this.noticeTemplates = noticeTemplates;
	}

	public NoticeTemplate addNoticeTemplate(NoticeTemplate noticeTemplate) {
		getNoticeTemplates().add(noticeTemplate);
		noticeTemplate.setSociety(this);

		return noticeTemplate;
	}

	public NoticeTemplate removeNoticeTemplate(NoticeTemplate noticeTemplate) {
		getNoticeTemplates().remove(noticeTemplate);
		noticeTemplate.setSociety(null);

		return noticeTemplate;
	}

	public List<SocietyNotice> getSocietyNotices() {
		return this.societyNotices;
	}

	public void setSocietyNotices(List<SocietyNotice> societyNotices) {
		this.societyNotices = societyNotices;
	}

	public SocietyNotice addSocietyNotice(SocietyNotice societyNotice) {
		getSocietyNotices().add(societyNotice);
		societyNotice.setSociety(this);

		return societyNotice;
	}

	public SocietyNotice removeSocietyNotice(SocietyNotice societyNotice) {
		getSocietyNotices().remove(societyNotice);
		societyNotice.setSociety(null);

		return societyNotice;
	}

	public List<BillTemplate> getBillTemplates() {
		return this.billTemplates;
	}

	public void setBillTemplates(List<BillTemplate> billTemplates) {
		this.billTemplates = billTemplates;
	}

	public BillTemplate addBillTemplate(BillTemplate billTemplate) {
		getBillTemplates().add(billTemplate);
		billTemplate.setSociety(this);

		return billTemplate;
	}

	public BillTemplate removeBillTemplate(BillTemplate billTemplate) {
		getBillTemplates().remove(billTemplate);
		billTemplate.setSociety(null);

		return billTemplate;
	}

}