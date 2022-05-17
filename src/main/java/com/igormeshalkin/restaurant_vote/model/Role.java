package com.igormeshalkin.restaurant_vote.model;

import org.springframework.security.core.authority.SimpleGrantedAuthority;

import java.util.Set;
import java.util.stream.Collectors;

public enum Role {
    ADMIN(Set.of(Permission.READ_YOUR_ENTRIES, Permission.READ_ANY_ENTRIES, Permission.CHANGE_ANY_ENTRIES, Permission.CHANGE_YOUR_ENTRIES)),
    USER(Set.of(Permission.READ_YOUR_ENTRIES, Permission.CHANGE_YOUR_ENTRIES));

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
