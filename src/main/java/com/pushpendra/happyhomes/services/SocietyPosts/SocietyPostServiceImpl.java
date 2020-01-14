package com.pushpendra.happyhomes.services.SocietyPosts;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.pushpendra.happyhomes.data.SocietyPosts.SocietyPostDao;
import com.pushpendra.happyhomes.helper.SocietyPosts.SocietyPostHelper;
import com.pushpendra.happyhomes.helper.society.SocietyPostsBO;
import com.pushpendra.happyhomes.model.SocietyPosts.PostSociety;

@Service
public class SocietyPostServiceImpl implements SocietyPostService {
	
	@Autowired
	private SocietyPostDao societyPostDao;
	
	@Autowired
	private SocietyPostHelper societyPostHelper;

	@Override
	public void updateStatus(SocietyPostsBO societyPostsBO) {
		PostSociety postSociety = societyPostHelper.getPostSociety(societyPostsBO);
		societyPostDao.updateStatus(postSociety);
	}

}
