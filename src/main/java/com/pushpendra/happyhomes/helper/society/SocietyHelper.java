package com.pushpendra.happyhomes.helper.society;

import java.util.ArrayList;
import java.util.Date;
import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;

import com.pushpendra.happyhomes.data.security.UserDetailServiceDao;
import com.pushpendra.happyhomes.helper.security.Signup;
import com.pushpendra.happyhomes.helper.security.UserAuthentication;
import com.pushpendra.happyhomes.model.SocietyPosts.PostComment;
import com.pushpendra.happyhomes.model.SocietyPosts.PostSociety;
import com.pushpendra.happyhomes.model.society.Society;
import com.pushpendra.happyhomes.model.user.UserPersonalDetail;

public class SocietyHelper {
	
	@Autowired
	private UserDetailServiceDao userDetailServices;

	public Society mapSocietyBoTOSociety(SocietyBO societyBo) {
		Society society = new Society();
		society.setSocietyName(societyBo.getSocietyName());
		society.setSocietyAddressLine1(societyBo.getSocietyAddressLine1());
		society.setSocietyAddressLine2(societyBo.getSocietyAddressLine2());
		society.setSocietyCity(Integer.toString(societyBo.getSocietyCity().getCityId()));
		society.setSocietyDateFormed(societyBo.getSocietyDateFormed());
		society.setNumOfFloors(societyBo.getNumOfFloors());
		society.setNumOfWingsBlock(societyBo.getNumOfWingsBlock());
		//society.setCreatedBy(null);
		society.setSocietyDateFormed(societyBo.getSocietyDateFormed());
		society.setSocietyLongLat(null);
		society.setSocietyRating(0);
		society.setSocietyState(Integer.toString(societyBo.getSocietyState().getStateId()));
		//society.setCreatedDate(new java.sql.Date(new Date().getTime()));
		society.setSocietyZipCode(societyBo.getSocietyZipCode());
		society.setTotalMembers(0);
		return society;
	}

	public ArrayList<Signup> mapSocietyListToSignupList(
			ArrayList<Society> societyDetails) {
		ArrayList<Signup> societyList = new ArrayList<Signup>();
		for(Society society : societyDetails){
			Signup signup = new Signup();
			SocietyBO societyBo = new SocietyBO();
			societyBo.setSocietyId(society.getSocietyId());
			societyBo.setSocietyName(society.getSocietyName());
			societyBo.setSocietyAddressLine1(society.getSocietyAddressLine1());
			signup.setSociety(societyBo);
			societyList.add(signup);
		}
		return societyList;
	}

	public SocietyPost getSocietyPostData(PostSociety postSociety, UserPersonalDetail details) {
		SocietyPost post = new SocietyPost();
		post.setCreatedBy(postSociety.getCreatedBy());
		post.setCreatedDate(postSociety.getCreatedDate());
		//post.setExtSharinAllowed(postSociety.getExternalSharingAllowed());
		//post.setPostCatagory(postSociety.getPostCatagoryBean().getCatagoryId());
		post.setPostData(postSociety.getPostData());
		post.setPostId(postSociety.getPostId());
		post.setSocietyId(postSociety.getSociety().getSocietyId());
		post.setUpdateDate(postSociety.getUpdatedDate());
		post.setUpdatedBy(postSociety.getUpdatedBy());
		post.setUserName(postSociety.getUserAuthenticationDetail().getUserName());
		post.setUserProfilePic(details.getUserProfilePic());
		post.setUserFirstName(details.getFirstName());
		post.setUserLastName(details.getLastName());
		return post;
	}

	public ArrayList<Comments> getPostCommentData(List<PostComment> postComments) {
		ArrayList<Comments> commentList = new ArrayList<Comments>();
		UserAuthentication authentication = new UserAuthentication();
		for(PostComment comment:postComments){
			Comments userComment = new Comments();
			authentication.setUserName(comment.getUserAuthenticationDetail().getUsername());
			UserPersonalDetail detail = userDetailServices.getUserPersonalDetails(authentication);
			userComment.setCommentData(comment.getCommentData());
			userComment.setCommentId(comment.getCommentId());
			userComment.setCreateDate(comment.getCreatedDate());
			userComment.setPostedBy(comment.getUserAuthenticationDetail().getUsername());
			userComment.setUpdateDate(comment.getUpdatedDate());
			userComment.setUserProfilePic(detail.getUserProfilePic());
			userComment.setUserFirstName(detail.getFirstName());
			userComment.setUserLastName(detail.getLastName());
			commentList.add(userComment);
		}
		return commentList;
	}
	
}
