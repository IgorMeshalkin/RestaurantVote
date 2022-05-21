package com.igormeshalkin.restaurant_vote.model;

public enum Permission {
    READ_YOUR_ENTRIES_ABOUT_USER("users:read your entries"),
    READ_ANY_ENTRIES_ABOUT_USER("users:read any entries"),
    CHANGE_YOUR_ENTRIES_ABOUT_USER("users:change your entries"),
    CHANGE_ANY_ENTRIES_ABOUT_USER("users:change any entries"),
    VOTE("users:vote"),
    READ_ENTRIES_ABOUT_EVERYTHING("everything:read entries"),
    CHANGE_ENTRIES_ABOUT_EVERYTHING("everything:change entries");

    private final String permission;

    Permission(String permission) {
        this.permission = permission;
    }

    public String getPermission() {
        return permission;
    }
}
