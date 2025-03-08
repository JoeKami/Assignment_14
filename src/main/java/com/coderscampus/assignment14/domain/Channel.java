package com.coderscampus.assignment14.domain;

import jakarta.persistence.*;

import java.util.List;

@Entity
public class Channel {
    public String channelName;

    @Id @GeneratedValue(strategy = GenerationType.IDENTITY)
    public Long channelId;

    @OneToMany
    public List<User> users;

    public String getChannelName() {
        return channelName;
    }

    public void setChannelName(String channelName) {
        this.channelName = channelName;
    }

    public Long getChannelId() {
        return channelId;
    }

    public void setChannelId(Long channelId) {
        this.channelId = channelId;
    }

    public List<User> getUsers() {
        return users;
    }

    public void setUsers(List<User> users) {
        this.users = users;
    }
}
