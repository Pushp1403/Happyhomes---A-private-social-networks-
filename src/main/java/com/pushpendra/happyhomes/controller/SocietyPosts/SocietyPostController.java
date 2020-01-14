package com.pushpendra.happyhomes.controller.SocietyPosts;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.ResponseBody;

import com.pushpendra.happyhomes.helper.society.SocietyPostsBO;
import com.pushpendra.happyhomes.services.SocietyPosts.SocietyPostService;

@Controller
public class SocietyPostController {
	
	@Autowired
	private SocietyPostService societyPostService;
	
	@RequestMapping(value="/updateStatus")
	@ResponseBody
	public void updateStatus(@RequestBody SocietyPostsBO societyPostsBO){
		this.societyPostService.updateStatus(societyPostsBO);
	}

}
