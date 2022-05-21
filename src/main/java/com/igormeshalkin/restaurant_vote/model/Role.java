package com.igormeshalkin.restaurant_vote.model;

import org.springframework.security.core.authority.SimpleGrantedAuthority;

import java.util.Set;
import java.util.stream.Collectors;

public enum Role {
    ADMIN(Set.of(Permission.READ_YOUR_ENTRIES_ABOUT_USER,
            Permission.READ_ANY_ENTRIES_ABOUT_USER,
            Permission.CHANGE_ANY_ENTRIES_ABOUT_USER,
            Permission.CHANGE_YOUR_ENTRIES_ABOUT_USER,
            Permission.VOTE,
            Permission.READ_ENTRIES_ABOUT_EVERYTHING,
            Permission.CHANGE_ENTRIES_ABOUT_EVERYTHING)),
    USER(Set.of(Permission.READ_YOUR_ENTRIES_ABOUT_USER,
            Permission.CHANGE_YOUR_ENTRIES_ABOUT_USER,
            Permission.VOTE,
            Permission.READ_ENTRIES_ABOUT_EVERYTHING));

    private final Set<Permission> permissions;

    Role(Set<Permission> permissions) {
        this.permissions = permissions;
    }

    public Set<Permission> getPermissions() {
        return permissions;
    }

    public Set<SimpleGrantedAuthority> getAuthorities() {
        return getPermissions().stream()
                .map(permission -> new SimpleGrantedAuthority(permission.getPermission()))
                .collect(Collectors.toSet());
    }
}
