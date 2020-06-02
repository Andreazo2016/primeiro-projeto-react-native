import React, { useState, useEffect } from 'react';
import { Keyboard, ActivityIndicator } from 'react-native';
import AsyncStorage from '@react-native-community/async-storage';
import Icon from 'react-native-vector-icons/MaterialIcons';
import api from '../../services/api';

import {
    Container,
    Form,
    Input,
    SubmitButton,
    List,
    User,
    Avatar,
    Name,
    Bio,
    ProfileButton,
    ProfileButtonText
} from './styles';


const Main = ({ navigation }) => {

    const [users, setUsers] = useState([])
    const [newUser, setNewUser] = useState('')
    const [loading, setLoading] = useState(false)

    useEffect(() => {
        async function handleStorage() {
            const users = await AsyncStorage.getItem('users')
            if (users) {
                setUsers(JSON.parse(users))
            }
        }
        handleStorage()
    }, [])

    useEffect(() => {
        AsyncStorage.setItem('users', JSON.stringify(users))
    }, [users])


    async function handleAddUser() {

        setLoading(true)
        const response = await api.get(`/users/${newUser}`)

        const data = {
            name: response.data.name,
            login: response.data.login,
            bio: response.data.bio,
            avatar: response.data.avatar_url
        }

        setUsers([...users, data])
        setNewUser('')
        setLoading(false)
        Keyboard.dismiss()
    }

    function handleNavigate(user) {
        navigation.navigate('User', { user: user })
    }

    return (
        <Container>
            <Form>
                <Input
                    autoCorrect={false}
                    autoCapitalize="none"
                    placeholder="Adicionar usuário"
                    value={newUser}
                    onChangeText={text => setNewUser(text)}
                    returnKeyType="send"
                    onSubmitEditing={handleAddUser}
                />
                <SubmitButton loading={loading} onPress={handleAddUser}>
                    {loading ? <ActivityIndicator color="#fff" /> : <Icon name="add" size={20} color="#fff" />}
                </SubmitButton>
            </Form>
            <List
                data={users}
                keyExtractor={user => user.login}
                renderItem={({ item }) => (
                    <User>
                        <Avatar source={{ uri: item.avatar }} />
                        <Name>{item.name}</Name>
                        <Bio>{item.bio}</Bio>

                        <ProfileButton onPress={() => handleNavigate(item)}>
                            <ProfileButtonText>Ver perfill</ProfileButtonText>
                        </ProfileButton>
                    </User>

                )}

            />
        </Container>
    );
};

export default Main;
