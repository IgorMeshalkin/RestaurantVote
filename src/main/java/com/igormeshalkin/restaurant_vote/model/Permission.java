package com.igormeshalkin.restaurant_vote.model;

public enum Permission {
    READ_YOUR_ENTRIES("users:read your entries"),
    READ_ANY_ENTRIES("users:read any entries"),
    CHANGE_YOUR_ENTRIES("users:change your entries"),
    CHANGE_ANY_ENTRIES("users:change any entries");

    private final String permission;

    Permission(String permission) {
        this.permission = permission;
    }

    public String getPermission() {
        return permission;
    }
}
