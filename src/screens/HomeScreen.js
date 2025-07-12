import React, { useEffect } from 'react';
import {
  View,
  FlatList,
  Text,
  RefreshControl,
  StyleSheet,
  TouchableOpacity,
  SafeAreaView,
  Image,
} from 'react-native';
import { useDispatch, useSelector } from 'react-redux';

import { logout } from '../redux/authSlice';
import { fetchUsers, resetUsers } from '../redux/userSlice';

export default function HomeScreen() {
  const dispatch = useDispatch();
  const { users, page, totalPages, loading } = useSelector((state) => state.user);

  useEffect(() => {
    dispatch(fetchUsers(1));
  }, [dispatch]);

  const loadMore = () => {
    if (page < totalPages && !loading) {
      dispatch(fetchUsers(page + 1));
    }
  };

  const handleRefresh = () => {
    dispatch(resetUsers());
    dispatch(fetchUsers(1));
  };

  const handleLogout = () => {
    dispatch(logout());
    dispatch(resetUsers());
  };

  const renderItem = ({ item }) => (
    <View style={styles.card}>
      <Image source={{ uri: item.avatar }} style={styles.avatar} />
      <View style={styles.textContainer}>
        <Text style={styles.name}>{item.first_name} {item.last_name}</Text>
        <Text style={styles.email}>{item.email}</Text>
      </View>
    </View>
  );

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.headerText}>User List</Text>
      </View>

      <FlatList
        data={users}
        keyExtractor={(item) => item.id.toString()}
        renderItem={renderItem}
        onEndReached={loadMore}
        onEndReachedThreshold={0.5}
        refreshControl={
          <RefreshControl refreshing={loading} onRefresh={handleRefresh} />
        }
        contentContainerStyle={styles.listContent}
      />

      <TouchableOpacity style={styles.logoutButton} onPress={handleLogout}>
        <Text style={styles.logoutText}>🔓 Logout</Text>
      </TouchableOpacity>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f6f9fc',
  },
  header: {
    padding: 20,
    backgroundColor: '#6C63FF',
    alignItems: 'center',
    borderBottomLeftRadius: 20,
    borderBottomRightRadius: 20,
    elevation: 5,
  },
  headerText: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#fff',
    marginTop:15
  },
  subTitle: {
    color: '#ddd',
    fontSize: 14,
    marginTop: 6,
  },
  listContent: {
    padding: 16,
    paddingBottom: 90,
  },
  card: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#fff',
    borderRadius: 16,
    padding: 16,
    marginBottom: 12,
    shadowColor: '#000',
    shadowOpacity: 0.06,
    shadowRadius: 6,
    shadowOffset: { width: 0, height: 4 },
    elevation: 4,
  },
  avatar: {
    width: 60,
    height: 60,
    borderRadius: 30,
    marginRight: 12,
    backgroundColor: '#eee',
  },
  textContainer: {
    flex: 1,
  },
  name: {
    fontSize: 16,
    color: '#222',
    fontWeight: '600',
  },
  email: {
    fontSize: 14,
    color: '#777',
    marginTop: 4,
  },
  logoutButton: {
    position: 'absolute',
    bottom: 28,
    alignSelf: 'center',
    backgroundColor: '#ff4d4d',
    paddingVertical: 12,
    paddingHorizontal: 100,
    borderRadius: 30,
    elevation: 6,
  },
  logoutText: {
    color: '#fff',
    fontWeight: 'bold',
    fontSize: 16,
  },
});
