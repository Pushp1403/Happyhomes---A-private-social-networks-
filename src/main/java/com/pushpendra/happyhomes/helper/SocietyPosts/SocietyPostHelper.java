package com.pushpendra.happyhomes.helper.SocietyPosts;

import java.util.Date;

import org.springframework.security.core.context.SecurityContextHolder;

import com.pushpendra.happyhomes.helper.society.SocietyPostsBO;
import com.pushpendra.happyhomes.model.SocietyPosts.PostSociety;
import com.pushpendra.happyhomes.model.security.UserAuthenticationDetail;
import com.pushpendra.happyhomes.model.society.Society;

public class SocietyPostHelper {

	public PostSociety getPostSociety(SocietyPostsBO societyPostsBO) {
		PostSociety postSociety = new PostSociety();
		Society society = new Society();
		UserAuthenticationDetail userAuthenticationDetail = (UserAuthenticationDetail) SecurityContextHolder.getContext().getAuthentication().getPrincipal();
		postSociety.setCreatedBy(societyPostsBO.getPost().getUserName());
		postSociety.setCreatedDate(new Date());
		postSociety.setExternalSharingAllowed(0);
		postSociety.setPostData(societyPostsBO.getPost().getPostData());
		society.setSocietyId(societyPostsBO.getPost().getSocietyId());
		postSociety.setSociety(society);
		postSociety.setUserAuthenticationDetail(userAuthenticationDetail);
		return postSociety;
	}

}
