package com.igormeshalkin.restaurant_vote.util;

import java.time.ZoneId;

public class TimeUtil {
    public final static ZoneId SERVER_ZONE_ID = ZoneId.of("+10");

    public final static String TIME_LIMIT_FOR_UPDATE_VOTE = "11:00:00";
}
