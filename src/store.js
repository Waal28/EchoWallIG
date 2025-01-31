// store.js
import { reactive } from 'vue';
import { formatData } from './utils/helperFunctions';

export const store = reactive({
  globalLoading: false,
  followingData: [],
  followersData: [],
  noFollowBackData: [],
  blockProfileData: [],
  closeFriendsData: [],
  pendingFollowReqData: [],
  setGlobalLoading(value) {
    this.globalLoading = value;
  },
  setFollowingData(data) {
    this.followingData = formatData(data.relationships_following);
  },
  setFollowersData(data) {
    this.followersData = formatData(data);
  },
  setNoFollowBackData(data1, data2) {
    const followingData = formatData(data1.relationships_following);
    const followersData = formatData(data2);
    this.noFollowBackData = followingData.filter(
      (item) => !followersData.some((follower) => follower.username.label === item.username.label)
    );
  },
  setBlockProfileData(data) {
    this.blockProfileData = formatData(data.relationships_blocked_users, true);
  },
  setCloseFriendsData(data) {
    this.closeFriendsData = formatData(data.relationships_close_friends);
  },
  setPendingFollowReqData(data) {
    this.pendingFollowReqData = formatData(data.relationships_follow_requests_sent);
  },
});
