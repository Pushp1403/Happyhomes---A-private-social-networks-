package com.pushpendra.happyhomes.helper.society;

import java.util.ArrayList;

public class SocietyPostsBO {
	private SocietyPost post;
	private ArrayList<Comments> commentList;
	public SocietyPost getPost() {
		return post;
	}
	public void setPost(SocietyPost post) {
		this.post = post;
	}
	public ArrayList<Comments> getCommentList() {
		return commentList;
	}
	public void setCommentList(ArrayList<Comments> commentList) {
		this.commentList = commentList;
	}
	
	
}
