package com.pushpendra.happyhomes.controller.security;

import org.springframework.security.web.context.AbstractSecurityWebApplicationInitializer;
import com.pushpendra.happyhomes.utilities.HappyHomesConstants;

public class HappyHomesSecurityInitializer extends
			AbstractSecurityWebApplicationInitializer {
	
	@Override
	protected String getDispatcherWebApplicationContextSuffix() {
		return HappyHomesConstants.HAPPYHOMES_ROOT;
	}

}
